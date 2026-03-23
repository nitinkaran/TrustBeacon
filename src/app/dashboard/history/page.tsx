"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { TrendingUp, Calendar, ChevronRight, BarChart3 } from "lucide-react";

// --- Types for ESLint ---
interface BusinessStat {
  id: string;
  business_name: string;
  trust_score: number;
  total_reviews: number;
  positive_ratio: number;
  updated_at: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<BusinessStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data, error } = await supabase
            .from("business_stats")
            .select("*")
            .eq("user_id", session.user.id)
            .order("updated_at", { ascending: false });

          if (!error && data) setHistory(data);
        } else {
          router.replace("/login");
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, [router]);

  // Click handle karne ka function
  const handleViewAnalysis = (businessName: string) => {
    // Hum dashboard page par redirect kar sakte hain with a query param
    // Ya fir abhi ke liye dashboard page par bhej rahe hain
    router.push(`/dashboard?business=${encodeURIComponent(businessName)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-zinc-500 font-mono italic">
          Loading your legacy...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-50 antialiased font-sans p-6 lg:p-10">
      <div className="mx-auto max-w-5xl space-y-10">
        
        {/* Header Section */}
        <header className="flex justify-between items-end border-b border-white/5 pb-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3">
              Archives
            </span>
            <h1 className="text-4xl font-black tracking-tight">Past <span className="text-blue-500">Scans</span></h1>
            <p className="text-zinc-500 mt-2 font-medium">Review your previous reputation analysis reports.</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-3xl font-bold text-zinc-100">{history.length}</p>
            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-tighter">Total Scans</p>
          </div>
        </header>

        {/* History List */}
        {history.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-zinc-900/5">
            <BarChart3 className="mx-auto text-zinc-800 mb-4" size={48} />
            <p className="text-zinc-600 font-medium">No history found. Start your first scan on the dashboard!</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="mt-6 text-blue-500 hover:underline text-sm font-bold"
            >
              Go to Dashboard →
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleViewAnalysis(item.business_name)}
                className="group relative overflow-hidden bg-zinc-900/20 border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/40 hover:bg-zinc-900/40 transition-all cursor-pointer shadow-xl shadow-black/20"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <TrendingUp size={120} />
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                      {item.business_name}
                    </h3>
                    <div className="flex items-center gap-4 text-zinc-500">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={14} />
                        {new Date(item.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:gap-10 items-center justify-between md:justify-end flex-1">
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-black text-zinc-600 mb-1 tracking-widest">Trust Score</p>
                      <span className="text-blue-500 font-black text-2xl italic">{item.trust_score}%</span>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-black text-zinc-600 mb-1 tracking-widest">Positive</p>
                      <span className="text-green-500 font-black text-2xl italic">{item.positive_ratio}%</span>
                    </div>

                    <div className="text-center hidden sm:block">
                      <p className="text-[10px] uppercase font-black text-zinc-600 mb-1 tracking-widest">Reviews</p>
                      <span className="text-zinc-100 font-bold text-2xl">{item.total_reviews}</span>
                    </div>

                    <div className="pl-4">
                      <div className="h-12 w-12 bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                        <ChevronRight size={20} className="text-zinc-500 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}