"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { TrendingUp, Calendar, ChevronRight, BarChart3, Clock, LayoutDashboard } from "lucide-react";

// --- Types for Data ---
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
        
        if (!session) {
          router.replace("/login");
          return;
        }

        // Fetching business stats for the logged-in user
        const { data, error } = await supabase
          .from("business_stats")
          .select("*")
          .eq("user_id", session.user.id)
          .order("updated_at", { ascending: false });

        if (error) throw error;
        if (data) setHistory(data);
        
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, [router]);

  // Click handle karke dashboard par data load karna
  const handleViewAnalysis = (businessName: string) => {
    router.push(`/dashboard?business=${encodeURIComponent(businessName)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="relative h-16 w-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
        </div>
        <div className="animate-pulse text-zinc-500 font-mono italic text-sm tracking-widest uppercase">
          Fetching Archives...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-50 antialiased font-sans p-6 lg:p-10">
      <div className="mx-auto max-w-5xl space-y-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3">
              <Clock size={12} /> Scan Archives
            </span>
            <h1 className="text-4xl font-black tracking-tight uppercase italic">
              Past <span className="text-blue-500">Scans</span>
            </h1>
            <p className="text-zinc-500 mt-2 font-medium">Revisit your previously generated reputation reports.</p>
          </div>
          
          <div className="bg-zinc-900/40 border border-white/5 px-6 py-4 rounded-3xl flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-black text-zinc-100 italic leading-none">{history.length}</p>
              <p className="text-[10px] text-zinc-600 uppercase font-black tracking-tighter mt-1">Total Scans</p>
            </div>
            <button 
                onClick={() => router.push('/dashboard')}
                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
            >
                <LayoutDashboard size={20} />
            </button>
          </div>
        </header>

        {/* History List */}
        {history.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-zinc-900/5">
            <BarChart3 className="mx-auto text-zinc-800 mb-4 opacity-20" size={64} />
            <p className="text-zinc-500 font-medium">Your archive is empty. Time to analyze some businesses!</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-xs font-black uppercase hover:bg-white/10 transition-all text-blue-500"
            >
              Start First Scan →
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
                {/* Background Decoration Icon */}
                <div className="absolute -bottom-6 -right-6 p-8 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity rotate-12">
                   <TrendingUp size={160} />
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-zinc-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                      {item.business_name}
                    </h3>
                    <div className="flex items-center gap-4 text-zinc-500">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                        <Calendar size={12} />
                        {new Date(item.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:gap-10 items-center justify-between md:justify-end flex-1">
                    <div className="text-center">
                      <p className="text-[9px] uppercase font-black text-zinc-600 mb-1 tracking-[0.2em]">Trust Score</p>
                      <span className="text-blue-500 font-black text-3xl italic tracking-tighter">{item.trust_score}%</span>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-[9px] uppercase font-black text-zinc-600 mb-1 tracking-[0.2em]">Positive</p>
                      <span className="text-green-500 font-black text-3xl italic tracking-tighter">{item.positive_ratio}%</span>
                    </div>

                    <div className="text-center hidden sm:block">
                      <p className="text-[9px] uppercase font-black text-zinc-600 mb-1 tracking-[0.2em]">Reviews</p>
                      <span className="text-zinc-100 font-bold text-3xl italic tracking-tighter">{item.total_reviews}</span>
                    </div>

                    <div className="pl-4">
                      <div className="h-14 w-14 bg-white/5 border border-white/5 rounded-[1.5rem] flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <ChevronRight size={24} className="text-zinc-500 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-10 text-center">
          <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">
            TrustBeacon Cloud Storage Active
          </p>
        </div>
      </div>
    </div>
  );
}