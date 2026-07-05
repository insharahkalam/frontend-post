export default function Featured() {
    return (
        <section id="featured" className="bg-paper py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-baseline justify-between mb-12 reveal">
                    <h2 className="font-display text-3xl lg:text-4xl">Featured</h2>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">Editor's pick</span>
                </div>

                <article className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center reveal">
                    {/* Image */}
                    <div className="lg:col-span-7 img-zoom rounded-2xl relative">
                        <img
                            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80"
                            alt="A hand writing notes in a paper notebook beside an open laptop"
                            className="w-full h-[320px] lg:h-[460px] object-cover rounded-2xl"
                        />
                        <span className="absolute top-5 left-5 bg-ink text-paper font-mono text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                            Culture
                        </span>
                    </div>

                    {/* Copy */}
                    <div className="lg:col-span-5">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-4">
                            12 min read · July 2, 2026
                        </p>
                        <h3 className="font-display font-medium text-3xl lg:text-[2.6rem] leading-[1.05] mb-5">
                            The Quiet Return of Handwriting in a Typed World
                        </h3>
                        <p className="text-ink/70 leading-relaxed mb-6">
                            After two decades of keyboards and keystrokes, a growing number of scientists,
                            students, and CEOs are reaching for pens again — not out of nostalgia, but
                            because the friction of handwriting seems to be doing something typing can't.
                        </p>
                        <div className="flex items-center gap-3 mb-8">
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
                                className="w-10 h-10 rounded-full object-cover"
                                alt="Portrait of Elena Marsh"
                            />
                            <div>
                                <p className="text-sm font-semibold">Elena Marsh</p>
                                <p className="text-xs text-ink/50">Senior Editor</p>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 font-semibold border-b-2 border-ink pb-1 hover:border-marigold hover:text-marigold transition-colors focus-ring"
                        >
                            Read the full story
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </a>
                    </div>
                </article>
            </div>
        </section>
    )
}