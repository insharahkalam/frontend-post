import React from "react";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

export default function ArticleHero() {
    return (
        <section
            style={sans}
            className="relative overflow-hidden bg-[#0e0c0a] border-b border-white/[0.06]"
        >
            {/* Warm ambient glows */}
            <div className="pointer-events-none absolute -top-40 -left-32 w-[560px] h-[560px] bg-amber-500/[0.07] rounded-full blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-56 right-0 w-[520px] h-[520px] bg-rose-500/[0.04] rounded-full blur-[120px]" />

            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
                }}
            />

            {/* Faint rule lines */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent hidden md:block" />

            <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-24 relative">
                {/* Top masthead row */}
                <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.32em] text-white/40 mb-14">
                    <span className="flex items-center gap-2">
                        <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                        Vol. 01 · Est. 2026
                    </span>
                    <span className="hidden sm:inline">
                        {new Date().toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>

                {/* Big hero heading */}
                <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-end">
                    <div className="md:col-span-8">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                            The Journal
                        </span>

                        <h1
                            style={{
                                ...serif,
                                fontOpticalSizing: "auto",
                                fontVariationSettings: "'SOFT' 60, 'WONK' 0",
                            }}
                            className="mt-6 text-[3rem] sm:text-[4.6rem] md:text-[5.4rem] leading-[0.98] font-light tracking-[-0.03em] text-[#f4ece0]"
                        >
                            Stories worth
                            <br />
                            <em
                                style={{
                                    ...serif,
                                    fontVariationSettings: "'SOFT' 100, 'WONK' 1",
                                }}
                                className="italic font-normal text-amber-200/90"
                            >
                                slowing down
                            </em>{" "}
                            for.
                        </h1>

                        <p className="mt-8 text-white/50 text-[15.5px] font-light leading-[1.85] max-w-xl">
                            A quiet corner of the internet for long-form essays, field notes
                            and interviews — written by people who still believe a good
                            sentence is worth rewriting a dozen times. New pieces land when
                            they’re ready, never on a schedule.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            <a
                                href="#latest"
                                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-200/90 text-[#1a1410] text-[13px] font-medium tracking-wide hover:bg-amber-100 transition-colors"
                            >
                                Read the latest
                                <span className="transition-transform duration-500 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>
                            <span
                                style={serif}
                                className="text-[15px] italic text-white/55 border-b border-white/25 pb-1 hover:text-amber-100 hover:border-amber-200/60 transition-colors cursor-pointer"
                            >
                                Browse the archive
                            </span>
                        </div>
                    </div>

                    {/* Right sidebar — featured pull-quote */}
                    <aside className="md:col-span-4 relative">
                        <div className="relative rounded-[22px] border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent p-7">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/35">
                                <span>Editor’s note</span>
                                <span className="text-amber-200/70">№ 01</span>
                            </div>

                            <p
                                style={serif}
                                className="mt-5 text-[1.35rem] leading-[1.35] italic font-light text-[#f4ece0]"
                            >
                                “Writing is thinking in slow motion — the only medium that
                                still asks the reader to sit still.”
                            </p>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
                                    <span style={serif} className="text-[13px] italic text-amber-100">
                                        E
                                    </span>
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[13px] text-white/85 font-medium">
                                        Editorial desk
                                    </span>
                                    <span className="text-[10.5px] uppercase tracking-[0.25em] text-white/35">
                                        From the founder
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Little stat row */}
                        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                            {[
                                { n: "42", l: "Essays" },
                                { n: "18", l: "Authors" },
                                { n: "6", l: "Topics" },
                            ].map((s) => (
                                <div
                                    key={s.l}
                                    className="rounded-[14px] border border-white/[0.06] py-3 bg-white/[0.015]"
                                >
                                    <div
                                        style={serif}
                                        className="text-[1.4rem] italic text-amber-200/85 leading-none"
                                    >
                                        {s.n}
                                    </div>
                                    <div className="mt-1.5 text-[9.5px] uppercase tracking-[0.28em] text-white/35">
                                        {s.l}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>

            </div>
        </section>
    );
}
