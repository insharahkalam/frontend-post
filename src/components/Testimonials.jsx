const TESTIMONIALS = [
    { quote: "Longhand is the only newsletter I read start to finish. Everything else I skim.", name: "Amara T.", desc: "Subscriber since 2022" },
    { quote: "It reads like a magazine that still respects your attention span.", name: "Jonas K.", desc: "Product designer" },
    { quote: "I forward the trending list to my whole team every Friday.", name: "Farah S.", desc: "Operations lead" },
    { quote: "The science coverage is the rare kind that doesn't oversimplify.", name: "Rui M.", desc: "Researcher" },
]

// Duplicate for seamless infinite scroll
const ALL = [...TESTIMONIALS, ...TESTIMONIALS]

export default function Testimonials() {
    return (
        <section className="bg-paper py-24 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14 reveal">
                <h2 className="font-display text-3xl lg:text-4xl">What readers underline</h2>
            </div>

            <div className="relative">
                <div className="flex gap-8 marquee-track w-max">
                    {ALL.map(({ quote, name, desc }, i) => (
                        <div key={i} className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">"{quote}"</p>
                            <p className="text-sm font-semibold">{name}</p>
                            <p className="text-xs text-ink/50">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}