"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, Legend 
} from 'recharts';
import { Sparkles, Copy, Check, BarChart3, ArrowLeft, Download, Loader2 } from "lucide-react";
import { toPng } from 'html-to-image';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportRef = useRef<HTMLDivElement>(null); 
  const businessParam = searchParams.get('business');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [businessData, setBusinessData] = useState<{
    name: string;
    score: number;
    totalReviews: number;
    positiveRatio: number;
  } | null>(null);

  // --- ✨ MAGIC REPLY STATES ---
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [replies, setReplies] = useState<{ [key: number]: string }>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // --- 🚀 PDF DOWNLOAD FIX ---
  const downloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const dataUrl = await toPng(reportRef.current, { 
        cacheBust: true,
        backgroundColor: '#000000',
        quality: 1,
        pixelRatio: 2,
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`${businessData?.name || "Reputation"}_Report.pdf`);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("PDF download fail ho gaya.");
    } finally {
      setIsExporting(false);
    }
  };

  // --- 🪄 MAGIC REPLY GENERATOR (FIXED) ---
  const generateReply = async (reviewId: number, reviewText: string, sentiment: string) => {
    setGeneratingId(reviewId);
    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        body: JSON.stringify({ 
          reviewText, 
          businessName: businessData?.name || "our business",
          sentiment: sentiment // Sending sentiment to AI
        }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (res.ok) {
        setReplies(prev => ({ ...prev, [reviewId]: data.reply }));
      }
    } catch (err) {
      console.error("Reply Error:", err);
    } finally {
      setGeneratingId(null);
    }
  };

  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) router.replace("/login");
      setIsLoading(false);
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    async function loadData() {
      if (businessParam) {
        setIsLoading(true);
        try {
          const { data: stats } = await supabase
            .from("business_stats")
            .select("*")
            .eq("business_name", businessParam)
            .single();

          if (stats) {
            setBusinessData({ 
              name: stats.business_name, 
              score: stats.trust_score, 
              totalReviews: stats.total_reviews, 
              positiveRatio: stats.positive_ratio 
            });
            const { data: revs } = await supabase
              .from("reviews")
              .select("*")
              .eq("business_name", businessParam);
            setReviews(revs || []);
          }
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
      }
    }
    loadData();
  }, [businessParam]);

  const handleScan = async () => {
    if (!url) return alert("Bhai, URL toh daal!");
    setIsScanning(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/scan", { 
        method: "POST", 
        body: JSON.stringify({ url, userId: session?.user?.id }), 
        headers: { "Content-Type": "application/json" } 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBusinessData({ 
        name: data.businessName, 
        score: Number(data.score), 
        totalReviews: data.totalReviews, 
        positiveRatio: Math.round((data.reviews.filter((r: any) => r.sentiment === 'Positive').length / data.reviews.length) * 100) 
      });
      setReviews(data.reviews || []);
    } catch (e: any) { alert(e.message); } finally { setIsScanning(false); }
  };

  const sentimentChartData = reviews.length > 0 ? [
    { name: 'Positive', value: reviews.filter(r => r.sentiment === 'Positive').length, color: '#22c55e' },
    { name: 'Neutral', value: reviews.filter(r => r.sentiment === 'Neutral').length, color: '#eab308' },
    { name: 'Negative', value: reviews.filter(r => r.sentiment === 'Negative').length, color: '#ef4444' },
  ].filter(d => d.value > 0) : [];

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono italic animate-pulse">Loading TrustBeacon...</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-50 p-6 lg:p-10 font-sans selection:bg-blue-500/30">
      <div className="mx-auto max-w-6xl space-y-10">
        
        {/* Header Section */}
        <div className="rounded-[2.5rem] border border-white/10 bg-zinc-900/20 p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">{businessData?.name || "Reputation Analyzer"}</h1>
              <p className="text-zinc-500 text-xs mt-1">AI-Powered Business Intelligence Report</p>
            </div>
            <div className="flex gap-3">
              {businessData && (
                <button 
                  onClick={downloadPDF} disabled={isExporting}
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-xs font-black uppercase hover:bg-blue-500 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {isExporting ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                  {isExporting ? "GENERATING..." : "DOWNLOAD REPORT"}
                </button>
              )}
              <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-xs font-black uppercase hover:bg-white/10 transition-all text-zinc-300">
                <ArrowLeft size={16} /> NEW SCAN
              </button>
            </div>
          </div>
          {!businessParam && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input 
                type="text" placeholder="Paste Google Maps URL..." 
                className="flex-1 rounded-2xl border border-white/10 bg-black p-4 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                value={url} onChange={(e) => setUrl(e.target.value)} 
              />
              <button onClick={handleScan} disabled={isScanning} className="rounded-2xl bg-blue-600 px-10 py-4 text-sm font-black uppercase text-white hover:bg-blue-500 transition-all">
                {isScanning ? "Scanning..." : "Analyze"}
              </button>
            </div>
          )}
        </div>

        {/* --- 📄 REPORT CONTENT --- */}
        {businessData && (
          <div ref={reportRef} className="space-y-10 bg-black p-10 rounded-[2.5rem] border border-white/5">
            <div className="border-b border-white/10 pb-8 flex justify-between items-end">
               <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">{businessData.name}</h2>
                  <p className="text-blue-500 font-bold tracking-[0.4em] text-[10px] mt-2 uppercase">Verified Reputation Report</p>
               </div>
               <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest hidden md:block">TRUSTBEACON AI</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-zinc-900/60 border border-white/5 p-8 rounded-3xl text-center">
                <p className="text-zinc-500 text-[10px] font-black uppercase mb-2 tracking-widest">Trust Score</p>
                <h3 className="text-6xl font-black text-blue-500 italic leading-none">{businessData.score}%</h3>
              </div>
              <div className="bg-zinc-900/60 border border-white/5 p-8 rounded-3xl text-center">
                <p className="text-zinc-500 text-[10px] font-black uppercase mb-2 tracking-widest">Positive Ratio</p>
                <h3 className="text-6xl font-black text-green-500 italic leading-none">{businessData.positiveRatio}%</h3>
              </div>
              <div className="bg-zinc-900/60 border border-white/5 p-8 rounded-3xl text-center flex flex-col justify-center">
                <p className="text-zinc-500 text-[10px] font-black uppercase mb-2 tracking-widest">Total Reviews</p>
                <h3 className="text-4xl font-bold text-zinc-100">{businessData.totalReviews}</h3>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] h-[450px]">
              <h3 className="text-zinc-200 font-bold mb-8 uppercase italic tracking-tighter border-l-4 border-blue-500 pl-4">Sentiment Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sentimentChartData} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value">
                    {sentimentChartData.map((entry, index) => <Cell key={index} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '15px' }} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Reviews Section with AI Reply Fix */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black italic text-zinc-400 border-l-8 border-blue-600 pl-4 uppercase tracking-tight">Recent Sentiment Analysis</h3>
              <div className="grid gap-6">
                {reviews.slice(0, 10).map((rev, i) => (
                  <div key={i} className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem] transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-xl text-zinc-100">{rev.reviewer_name}</span>
                      <span className={`text-[10px] px-3 py-1 rounded-full font-black ${rev.sentiment === 'Positive' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {rev.sentiment.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm italic border-l border-white/10 pl-4 mb-6">"{rev.review_text}"</p>
                    
                    {/* --- ✨ MAGIC REPLY UI --- */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      {replies[rev.id] ? (
                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl relative animate-in fade-in zoom-in duration-300">
                          <p className="text-sm text-blue-100 leading-relaxed pr-10">{replies[rev.id]}</p>
                          <button 
                            onClick={() => copyToClipboard(rev.id, replies[rev.id])}
                            className="absolute top-4 right-4 text-blue-400 hover:text-white transition-colors"
                          >
                            {copiedId === rev.id ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => generateReply(rev.id, rev.review_text, rev.sentiment)}
                          disabled={generatingId === rev.id}
                          className="flex items-center gap-2 text-xs font-black uppercase text-blue-500 hover:text-blue-400 transition-all disabled:opacity-50"
                        >
                          {generatingId === rev.id ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                          {generatingId === rev.id ? "Thinking..." : "Magic Reply"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 text-center border-t border-white/5">
                <p className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.5em]">This report was generated automatically by TrustBeacon AI Engine</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white italic">TRUSTBEACON IS LOADING...</div>}>
      <DashboardContent />
    </Suspense>
  );
}