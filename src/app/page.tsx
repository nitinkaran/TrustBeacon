export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-50 antialiased">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-sky-500/20 ring-1 ring-white/10">
              <span className="text-sm font-semibold tracking-tight">TB</span>
            </div>
            <span className="text-base font-semibold tracking-tight">
              TrustBeacon AI
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
            <a className="hover:text-zinc-100" href="#how-it-works">
              How it works
            </a>
            <a className="hover:text-zinc-100" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-zinc-100" href="#faq">
              FAQ
            </a>
          </nav>

          <a
            href="#pricing"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Get started
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute left-1/2 top-[55%] h-96 w-[44rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200">
                  Built for US businesses who want more 5-star reviews
                </p>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Turn happy customers into{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
                    5-star reviews
                  </span>
                  — automatically.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  TrustBeacon AI helps US businesses connect Stripe, send
                  personalized AI review invites, and steadily grow
                  star-rating momentum.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-zinc-200"
                  >
                    Start for $49/month
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
                  >
                    See how it works
                  </a>
                </div>

                <ul className="mt-8 space-y-3 text-sm text-zinc-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 ring-1 ring-violet-400/30">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M10.2 2.2L4.6 8.0L1.8 5.2"
                          stroke="#C4B5FD"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>
                      AI invites that sound natural (not spammy)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/20 ring-1 ring-fuchsia-400/30">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M10.2 2.2L4.6 8.0L1.8 5.2"
                          stroke="#F0ABFC"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>Simple setup: Stripe -> invites -> reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 ring-1 ring-sky-400/30">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M10.2 2.2L4.6 8.0L1.8 5.2"
                          stroke="#7DD3FC"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>Designed to help you earn consistent 5-star momentum</span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-sm font-semibold">No manual chasing</div>
                    <div className="mt-1 text-xs text-zinc-400">
                      TrustBeacon handles the outreach flow
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-sm font-semibold">Built for US businesses</div>
                    <div className="mt-1 text-xs text-zinc-400">
                      Messaging tuned for local expectations
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent blur-xl" />
                <div className="relative rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">
                        Review growth dashboard
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">
                        A simple flow you can trust
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-zinc-200">
                      Live setup
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Connect Stripe</div>
                        <div className="text-xs font-semibold text-violet-200">
                          Step 1
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-zinc-300">
                        Pull purchase signals to know when to request feedback.
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Send AI Invites</div>
                        <div className="text-xs font-semibold text-fuchsia-200">
                          Step 2
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-zinc-300">
                        Personalized invites that encourage honest, detailed reviews.
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Get 5-Star Reviews</div>
                        <div className="text-xs font-semibold text-sky-200">
                          Step 3
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-zinc-300">
                        Turn great experiences into a steady flow of ratings.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-sky-500/15 p-4 ring-1 ring-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">Ready to start?</div>
                        <div className="mt-1 text-xs text-zinc-400">
                          Pricing is straightforward. Upgrade anytime.
                        </div>
                      </div>
                      <a
                        href="#pricing"
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
                      >
                        Choose plan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              How it Works
            </h2>
            <p className="mt-3 text-zinc-300">
              Three steps. One goal: more 5-star reviews from real customers.
            </p>
            <p className="mt-3 text-sm font-semibold text-zinc-200">
              Connect Stripe -&gt; Send AI Invites -&gt; Get 5-Star Reviews
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-100">
                  Step 1
                </div>
                <div className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200 ring-1 ring-violet-400/25">
                  Stripe
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Connect Stripe
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                TrustBeacon detects the right moments to ask for feedback,
                so you only request reviews when it matters.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-100">
                  Step 2
                </div>
                <div className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-400/25">
                  AI Invites
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Send AI Invites
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                Personalized messaging encourages customers to leave a detailed,
                honest review.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-100">
                  Step 3
                </div>
                <div className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-400/25">
                  5-Star Results
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Get 5-Star Reviews
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                Build reputation over time with consistent review requests and
                high-quality invites.
              </p>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-3 text-zinc-300">
                Simple, premium, and designed to pay for itself.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-zinc-300">
              Cancel anytime. No complicated tiers.
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

                <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-zinc-200">
                      Most popular
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">
                      TrustBeacon AI — $49/month
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300">
                      Everything you need to connect Stripe, send AI review invites,
                      and grow your reputation.
                    </p>

                    <div className="mt-6 grid gap-3 text-sm">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M10.2 2.2L4.6 8.0L1.8 5.2"
                              stroke="#E4E4E7"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>Stripe-powered invite timing</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M10.2 2.2L4.6 8.0L1.8 5.2"
                              stroke="#E4E4E7"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>AI-crafted review invite messaging</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M10.2 2.2L4.6 8.0L1.8 5.2"
                              stroke="#E4E4E7"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>Designed for steady, reputation-building output</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                    <div className="text-sm font-semibold text-zinc-100">
                      Ready to start earning more 5-star reviews?
                    </div>
                    <div className="mt-4 flex items-end gap-3">
                      <div className="text-5xl font-semibold tracking-tight">
                        $49
                      </div>
                      <div className="pb-1 text-sm text-zinc-400">per month</div>
                    </div>

                    <a
                      href="#"
                      className="mt-6 block w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
                      aria-label="Start TrustBeacon AI"
                    >
                      Start now
                    </a>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                      By starting, you agree to receive review-invite communications
                      related to your subscription.
                    </p>

                    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold text-zinc-200">
                        For US businesses
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">
                        If you serve the US market, TrustBeacon is optimized for
                        the review expectations customers respond to.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              FAQ
            </h2>
            <p className="mt-3 text-zinc-300">
              Quick answers to common questions.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Does TrustBeacon replace my review process?</div>
              <p className="mt-2 text-sm text-zinc-300">
                It complements your workflow by automating the invite step after
                customers pay through Stripe.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Will the invites sound like AI spam?</div>
              <p className="mt-2 text-sm text-zinc-300">
                The messaging is crafted to sound natural and helpful, with
                a focus on encouraging honest feedback.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">What do I need to start?</div>
              <p className="mt-2 text-sm text-zinc-300">
                A Stripe account and basic business info. TrustBeacon handles the rest.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Can I cancel?</div>
              <p className="mt-2 text-sm text-zinc-300">
                Yes. Cancel anytime. Pricing stays simple at $49/month.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-black/60">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-400">
              © {new Date().getFullYear()} TrustBeacon AI. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a className="text-sm text-zinc-300 hover:text-zinc-100" href="#how-it-works">
                How it works
              </a>
              <a className="text-sm text-zinc-300 hover:text-zinc-100" href="#pricing">
                Pricing
              </a>
              <a className="text-sm text-zinc-300 hover:text-zinc-100" href="#faq">
                FAQ
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
