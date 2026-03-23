import Link from "next/link";
import Year from "@/components/Year";
import { Sparkles, BarChart3, ShieldCheck, Zap, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-50 antialiased selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 shadow-lg shadow-blue-500/20">
              <span className="text-xs font-black tracking-tighter text-white">TB</span>
            </div>
            <span className="text-base font-bold tracking-tight">
              TrustBeacon <span className="text-blue-500">AI</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-400 sm:flex">
            <a className="hover:text-blue-400 transition-colors" href="#features">Features</a>
            <a className="hover:text-blue-400 transition-colors" href="#how-it-works">Workflow</a>
            <a className="hover:text-blue-400 transition-colors" href="#pricing">Pricing</a>
          </nav>

          <Link
            href="/login"
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:pt-32">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  <Sparkles size={12} /> AI-Powered Reputation Management
                </div>

                <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
                  Dominate <br />
                  <span className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent italic">
                    Local Search.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                  TrustBeacon AI helps US businesses automate 5-star review collection via Stripe and analyzes customer sentiment using advanced LLMs.
                </p>

                <div className="mt-10 flex flex-col w-full gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/dashboard"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    Run Free AI Audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-zinc-100 transition hover:bg-white/10"
                  >
                    View Pricing
                  </Link>
                </div>
                
                <div className="mt-10 flex items-center gap-4 border-t border-white/5 pt-8 w-full">
                   <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-full bg-zinc-800 border-2 border-black" />)}
                   </div>
                   <p className="text-xs font-medium text-zinc-500">Trusted by 500+ US small businesses</p>
                </div>
              </div>

              {/* Dashboard Preview Card */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-fuchsia-600 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/50" />
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Reputation Feed</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/5 animate-pulse">
                        <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
                        <div className="h-3 w-3/4 bg-white/5 rounded" />
                    </div>
                    <div className="rounded-2xl bg-blue-600/10 p-4 border border-blue-500/20">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-blue-400">Trust Score</span>
                           <span className="text-sm font-black text-blue-400 italic">94%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full w-[94%] bg-blue-500" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid - The "Analysis" Part */}
        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter sm:text-5xl">
              Don't guess. <span className="text-blue-500">Analyze.</span>
            </h2>
            <p className="mt-4 text-zinc-500 font-medium">Our AI doesn't just collect reviews. It understands your business like a consultant.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Sentiment Analysis", desc: "Know exactly why customers love (or leave) you with LLM-powered insights.", icon: <BarChart3 className="text-blue-400" /> },
              { title: "Stripe Triggers", desc: "Automated review invites sent at the perfect moment of peak customer joy.", icon: <Zap className="text-fuchsia-400" /> },
              { title: "AI Magic Replies", desc: "Draft professional, personalized responses to every review in one click.", icon: <Sparkles className="text-indigo-400" /> }
            ].map((f, i) => (
              <div key={i} className="group rounded-[2rem] border border-white/5 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 transition-all">
                <div className="mb-4 inline-block rounded-2xl bg-white/5 p-3 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 text-center">
          <div className="rounded-[3rem] border border-blue-500/20 bg-blue-500/5 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><ShieldCheck size={120} /></div>
            
            <h2 className="text-4xl font-black uppercase italic italic mb-4">One Simple Plan.</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
               <span className="text-6xl font-black tracking-tighter">$49</span>
               <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">/ Month</span>
            </div>
            
            <ul className="text-zinc-300 space-y-3 mb-10 text-sm font-medium">
               <li className="flex items-center justify-center gap-2"><Star size={14} className="text-blue-500" /> Unlimited AI Audit Scans</li>
               <li className="flex items-center justify-center gap-2"><Star size={14} className="text-blue-500" /> Stripe-Powered Review Invites</li>
               <li className="flex items-center justify-center gap-2"><Star size={14} className="text-blue-500" /> AI Reply Assistant</li>
            </ul>

            <Link href="/login" className="inline-block w-full max-w-xs rounded-2xl bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black hover:bg-zinc-200 transition-all active:scale-95">
               Start Free Trial
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-4">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
               © <Year /> TrustBeacon AI. US Market v2.4
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}