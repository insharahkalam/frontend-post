const ARTICLES = [
    {
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        alt: "Robotic arms assembling machine parts on a factory line",
        meta: "Technology · 8 min", metaColor: "text-teal",
        title: "Inside the Factories Building Robots That Build Robots",
        excerpt: "A look at the recursive supply chain quietly reshaping industrial automation.",
        byline: "David Okafor · July 1, 2026",
    },
    {
        img: "https://images.unsplash.com/photo-1497436072909-f5e4be1713f9?w=800&q=80",
        alt: "Sunlit coral reef with fish swimming",
        meta: "Science · 10 min", metaColor: "text-crimson",
        title: "Why Coral Reefs Are Learning to Move",
        excerpt: "Marine biologists are relocating entire reef colonies before the water gets too warm to wait.",
        byline: "Priya Chandran · June 29, 2026",
    },
    {
        img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        alt: "Team meeting around a table with laptops and notebooks",
        meta: "Business · 7 min", metaColor: "text-ink/60",
        title: "The Four-Day Week Is Quietly Rewriting Management",
        excerpt: "Fewer hours are forcing managers to finally decide what actually matters.",
        byline: "Tomas Reyes · June 27, 2026",
    },
    {
        img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
        alt: "Pedestrians crossing a busy city street",
        meta: "Design · 9 min", metaColor: "text-teal",
        title: "What Makes a City Walkable, According to the People Who Walk It",
        excerpt: "Urban planners are trading satellite data for shoe leather — with better results.",
        byline: "Elena Marsh · June 24, 2026",
    },
    {
        img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
        alt: "Old paper map on a wooden table",
        meta: "Culture · 11 min", metaColor: "text-marigold",
        title: "The Last Cartographers: Mapping Places GPS Can't Reach",
        excerpt: "A dying craft is being kept alive by the handful of places satellites still can't chart.",
        byline: "David Okafor · June 21, 2026",
    },
    {
        img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
        alt: "Solar panels and wind turbines in a green field",
        meta: "Environment · 8 min", metaColor: "text-crimson",
        title: "Small Modular Reactors and the Return of Nuclear Optimism",
        excerpt: "A new generation of smaller, cheaper reactors is changing minds on the grid of the future.",
        byline: "Priya Chandran · June 18, 2026",
    },
]

export default function LatestArticles() {
    return (
        <section id="latest" className="bg-paper py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-baseline justify-between mb-12 reveal">
                    <h2 className="font-display text-3xl lg:text-4xl">Latest articles</h2>
                    <a href="#" className="text-sm font-semibold border-b-2 border-ink hover:border-marigold hover:text-marigold transition-colors focus-ring">
                        View archive
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
                    {ARTICLES.map(({ img, alt, meta, metaColor, title, excerpt, byline }) => (
                        <article key={title} className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img src={img} className="w-full h-full object-cover" alt={alt} />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className={`font-mono text-[11px] uppercase tracking-[0.15em] mb-3 ${metaColor}`}>
                                    {meta}
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">{title}</h3>
                                <p className="text-sm text-ink/60 mb-4">{excerpt}</p>
                                <p className="text-xs text-ink/50">{byline}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}