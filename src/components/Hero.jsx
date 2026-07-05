export default function Hero() {
    return (
        <section id="top" className="relative bg-ink text-paper pt-40 pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
            {/* dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #F3EFE4 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div className="absolute -right-24 top-24 w-[420px] h-[420px] rounded-full bg-marigold/10 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-end">

                {/* Left — headline */}
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
                        Longhand is a slow-read journal for people who still underline things —
                        reporting on technology, culture, and science that rewards a second look.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-5">
                        <a
                            href="#featured"
                            className="group inline-flex items-center gap-2 bg-marigold text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-paper transition-colors focus-ring"
                        >
                            Start reading
                            <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

                {/* Right — quote card */}
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
    )
}