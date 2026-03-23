"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M21.806 10.221c.178.995.178 2.054 0 3.049-.287 1.61-1.097 3.056-2.277 4.08-1.38 1.184-3.17 1.885-5.112 1.885-4.012 0-7.268-3.255-7.268-7.268S10.405 6.7 14.417 6.7c1.941 0 3.732.7 5.112 1.885l-2.12 2.12c-.55-.483-1.309-.767-2.992-.767-2.493 0-4.521 2.028-4.521 4.52 0 2.494 2.028 4.521 4.52 4.521 1.827 0 3.1-.807 3.613-2.03h-3.613v-2.543h6.884c.123 0 .244.013.295.081z"
      />
      <path
        fill="#FF3D00"
        d="M12.76 13.24v-2.54h9.046c.255 1.47-.068 2.976-.76 4.11l-2.12-1.57c.327-.74.368-1.4.347-2.0z"
      />
      <path
        fill="#4CAF50"
        d="M5.41 12c.125-1.2.72-2.36 1.69-3.2l1.8 1.8c-.5.43-.84 1.03-1 1.66z"
      />
      <path
        fill="#1976D2"
        d="M14.417 6.7c1.941 0 3.732.7 5.112 1.885l-2.12 2.12c-.55-.483-1.309-.767-2.992-.767z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        router.replace("/dashboard");
      }
      setIsCheckingSession(false);
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function signInWithGoogle() {
    setIsLoading(true);
    setError(null);

    // Redirect to the auth callback route we created
    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-zinc-50 antialiased">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-black/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-sky-500/20 ring-1 ring-white/10">
              <span className="text-sm font-semibold tracking-tight">TB</span>
            </div>
            <span className="text-base font-semibold tracking-tight">TrustBeacon AI</span>
          </div>
          <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200">
              Built for US businesses
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Sign in to <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">TrustBeacon AI</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              Personalized AI invites to build a steady 5-star reputation.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-100">Welcome back</h2>
            <div className="mt-6">
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={isLoading || isCheckingSession}
                className="group w-full rounded-xl border border-white/10 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-sky-500/20 p-[1px] disabled:opacity-60"
              >
                <span className="flex w-full items-center justify-center gap-3 rounded-[0.7rem] bg-black px-4 py-3 text-sm font-semibold text-zinc-50 transition group-hover:bg-zinc-950">
                  <GoogleIcon />
                  {isLoading ? "Redirecting..." : isCheckingSession ? "Checking session..." : "Sign in with Google"}
                </span>
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}