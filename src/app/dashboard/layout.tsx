"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, History, Settings, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Past Scans", href: "/dashboard/history", icon: History },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // --- 🚪 FIXED LOGOUT FUNCTION ---
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Session clear hone ke baad user ko login page par redirect karna
      window.location.href = "/login"; 
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout fail ho gaya, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile Menu Button (Only shows on small screens) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 rounded-lg border border-white/10"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-white/5 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-full flex flex-col p-6">
          {/* Logo Section */}
          <div className="mb-10 px-2">
            <h1 className="text-xl font-black tracking-tighter text-blue-500 italic uppercase">
              TrustBeacon AI
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on mobile after click
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "text-zinc-500 hover:bg-white/5 hover:text-white"}
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Logout Button (The one you wanted to fix) */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 transition-colors mt-auto font-black uppercase text-[10px] tracking-widest border-t border-white/5 pt-6 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden bg-black">
        {children}
      </main>
    </div>
  );
}