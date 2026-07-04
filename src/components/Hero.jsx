import React from 'react'

const Hero = () => {
    return (
        <>
            <div className="font-body text-ink antialiased">
                <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #F3EFE4; }

        ::selection { background: #E8A33D; color: #14171F; }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(.2,.8,.2,1), transform 0.8s cubic-bezier(.2,.8,.2,1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger > * {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(.2,.8,.2,1), transform 0.7s cubic-bezier(.2,.8,.2,1);
        }
        .reveal-stagger.is-visible > * { opacity: 1; transform: translateY(0); }
        .reveal-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms; }
        .reveal-stagger.is-visible > *:nth-child(2) { transition-delay: 90ms; }
        .reveal-stagger.is-visible > *:nth-child(3) { transition-delay: 180ms; }
        .reveal-stagger.is-visible > *:nth-child(4) { transition-delay: 270ms; }
        .reveal-stagger.is-visible > *:nth-child(5) { transition-delay: 360ms; }
        .reveal-stagger.is-visible > *:nth-child(6) { transition-delay: 450ms; }

        .mark-underline {
          background-image: linear-gradient(#E8A33D, #E8A33D);
          background-repeat: no-repeat;
          background-size: 0% 0.4em;
          background-position: 0 88%;
          transition: background-size 1.1s cubic-bezier(.2,.8,.2,1) 0.3s;
        }
        .mark-underline.is-visible { background-size: 100% 0.4em; }

        .card-lift { transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease; }
        .card-lift:hover { transform: translateY(-8px); box-shadow: 0 24px 48px -18px rgba(20,23,31,0.35); }

        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.8s cubic-bezier(.2,.8,.2,1); }
        .img-zoom:hover img { transform: scale(1.08); }

        .nav-blur { backdrop-filter: blur(10px); background-color: rgba(20,23,31,0.82); }

        .marquee-track { animation: marquee 32s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .ticker-track { animation: ticker 22s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .spine-num { font-variant-numeric: tabular-nums; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal-stagger > *, .mark-underline, .card-lift, .img-zoom img { transition: none !important; animation: none !important; opacity: 1 !important; transform: none !important; background-size: 100% 0.4em !important; }
          .marquee-track, .ticker-track { animation: none !important; }
        }

        .focus-ring:focus-visible { outline: 3px solid #E8A33D; outline-offset: 3px; }

        .tag-dot { width: 7px; height: 7px; border-radius: 999px; display: inline-block; }
      `}</style>

                {/* ============ HERO ============ */}
                <section id="top" className="relative bg-ink text-paper pt-40 pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
                    {/* ambient marks */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, #F3EFE4 1px, transparent 0)",
                            backgroundSize: "28px 28px",
                        }}
                    ></div>
                    <div className="absolute -right-24 top-24 w-[420px] h-[420px] rounded-full bg-marigold/10 blur-3xl"></div>

                    <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8 reveal">
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-marigold mb-6">
                                Issue No. 84 — Reading Season
                            </p>
                            <h1 className="font-display font-medium leading-[0.98] text-[13vw] sm:text-6xl lg:text-[6.2rem] tracking-tight">
                                Stories worth
                                <span className="block italic">
                                    <span className="mark-underline">writing down</span>
                                </span>
                            </h1>
                            <p className="mt-8 max-w-xl text-paper/70 text-lg leading-relaxed">
                                Longhand is a slow-read journal for people who still underline
                                things — reporting on technology, culture, and science that
                                rewards a second look.
                            </p>
                            <div className="mt-10 flex flex-wrap items-center gap-5">
                                <a
                                    href="#featured"
                                    className="group inline-flex items-center gap-2 bg-marigold text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-paper transition-colors focus-ring"
                                >
                                    Start reading
                                    <svg
                                        className="transition-transform group-hover:translate-x-1"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </a>
                                <a
                                    href="#categories"
                                    className="text-paper/70 hover:text-paper font-medium underline decoration-paper/30 underline-offset-4 focus-ring rounded"
                                >
                                    Browse by category
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-4 reveal" style={{ transitionDelay: "150ms" }}>
                            <div className="border border-white/15 rounded-2xl p-6 bg-white/5">
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-marigold mb-4">
                                    Today's margin note
                                </p>
                                <p className="font-display italic text-2xl leading-snug">
                                    "The best editing tool is still a walk around the block."
                                </p>
                                <p className="mt-4 text-sm text-paper/60">— Elena Marsh, Senior Editor</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Hero