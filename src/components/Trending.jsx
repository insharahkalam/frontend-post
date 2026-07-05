const TRENDING = [
  { rank: "01", category: "Technology", catColor: "text-teal",     title: "The Economics of Attention: Why Nothing Is Free",                            reads: "184K reads" },
  { rank: "02", category: "Culture",    catColor: "text-crimson",  title: "The Quiet Return of Handwriting in a Typed World",                             reads: "161K reads" },
  { rank: "03", category: "Science",    catColor: "text-teal",     title: "Why Coral Reefs Are Learning to Move",                                         reads: "139K reads" },
  { rank: "04", category: "Business",   catColor: "text-paper/40", title: "The Four-Day Week Is Quietly Rewriting Management",                            reads: "112K reads" },
  { rank: "05", category: "Design",     catColor: "text-marigold", title: "What Makes a City Walkable, According to the People Who Walk It",              reads: "97K reads"  },
]

export default function Trending() {
  return (
    <section id="trending" className="bg-ink text-paper py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-baseline justify-between mb-12 reveal">
          <h2 className="font-display text-3xl lg:text-4xl">Trending this week</h2>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">Ranked by reads</span>
        </div>

        <div className="divide-y divide-white/10 reveal-stagger">
          {TRENDING.map(({ rank, category, catColor, title, reads }) => (
            <a
              key={rank}
              href="#"
              className="group flex items-center gap-6 lg:gap-10 py-6 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors"
            >
              <span className="font-display italic text-4xl lg:text-5xl text-marigold w-14 spine-num">
                {rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`font-mono text-[11px] uppercase tracking-[0.15em] mb-1 ${catColor}`}>
                  {category}
                </p>
                <h3 className="font-display text-xl lg:text-2xl truncate group-hover:text-marigold transition-colors">
                  {title}
                </h3>
              </div>
              <span className="hidden sm:block font-mono text-sm text-paper/50">{reads}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}