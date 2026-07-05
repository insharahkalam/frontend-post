const CATEGORIES = [
    { label: "Technology", count: 142, dot: "bg-teal" },
    { label: "Culture", count: 98, dot: "bg-marigold" },
    { label: "Science", count: 76, dot: "bg-crimson" },
    { label: "Business", count: 64, dot: "bg-ink" },
    { label: "Design", count: 51, dot: "bg-teal" },
    { label: "Environment", count: 39, dot: "bg-marigold" },
]

export default function Categories() {
    return (
        <section id="categories" className="bg-paperdim py-24 lg:py-28 border-y border-ink/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="mb-12 reveal">
                    <h2 className="font-display text-3xl lg:text-4xl">Browse by category</h2>
                    <p className="text-ink/60 mt-3 max-w-lg">
                        Six beats, one newsroom — pick a thread and pull it.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 reveal-stagger">
                    {CATEGORIES.map(({ label, count, dot }) => (
                        <a
                            key={label}
                            href="#latest"
                            className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4"
                        >
                            <span className={`tag-dot ${dot}`} />
                            <div>
                                <p className="font-display text-xl">{label}</p>
                                <p className="text-sm text-ink/50 mt-1">{count} articles</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}