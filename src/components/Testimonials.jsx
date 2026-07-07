import React from "react";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

const testimonials = [
    {
        quote:
            "This is the first place I've read something online and actually slowed down. The writing here respects your attention instead of fighting for it.",
        name: "Amara Chen",
        role: "Product Designer",
        image: null,
    },
    {
        quote:
            "I came for one article and stayed for three hours. Rare to find a publication that treats long-form writing like a craft, not just content.",
        name: "Daniel Osei",
        role: "Independent Writer",
        image: null,
    },
    {
        quote:
            "Every piece feels edited with care. No filler, no clickbait — just ideas worth sitting with.",
        name: "Priya Nair",
        role: "Editor, The Weekly Signal",
        image: null,
    },
];

export default function Testimonials() {
    return (
        <div style={sans} className="bg-[#0e0c0a] relative overflow-hidden px-4 sm:px-8 py-20 sm:py-28">
            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-52 -left-40 w-[560px] h-[560px] bg-amber-500/[0.05] rounded-full blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-52 -right-40 w-[560px] h-[560px] bg-rose-500/[0.035] rounded-full blur-[120px]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
                }}
            />

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="text-center max-w-xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                        <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                        Readers speak
                    </span>

                    <h2
                        style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 50" }}
                        className="text-[2rem] sm:text-[2.8rem] leading-[1.1] font-light tracking-[-0.02em] text-[#f4ece0] mt-6"
                    >
                        Words from{" "}
                        <em
                            style={{ ...serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
                            className="italic font-normal text-amber-200/90"
                        >
                            our readers
                        </em>
                    </h2>
                    <p className="text-[14px] text-white/45 font-light mt-4 leading-relaxed">
                        A few thoughts from people who've spent time with our stories.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    {testimonials.map((t, i) => {
                        const initial = t.name.charAt(0).toUpperCase();
                        return (
                            <div
                                key={i}
                                className="group relative flex flex-col h-full bg-[#141210] border border-white/[0.07] rounded-[20px] p-7 hover:border-amber-300/25 hover:-translate-y-1 hover:shadow-[0_20px_60px_-16px_rgba(251,191,36,0.15)] transition-all duration-500"
                            >
                                {/* Quote mark */}
                                <span
                                    style={serif}
                                    className="text-amber-300/25 text-[3rem] leading-none italic select-none"
                                >
                                    "
                                </span>

                                <p
                                    style={{ ...serif, fontVariationSettings: "'SOFT' 20" }}
                                    className="text-white/65 text-[15.5px] font-light leading-[1.75] flex-1 -mt-3"
                                >
                                    {t.quote}
                                </p>

                                <div className="flex items-center gap-3 mt-7 pt-6 border-t border-white/[0.06]">
                                    {t.image ? (
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-10 h-10 flex-shrink-0 rounded-full object-cover border border-amber-300/25 ring-2 ring-amber-300/[0.06]"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
                                            <span style={serif} className="text-[13px] italic text-amber-100">
                                                {initial}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[13px] text-white/85 font-medium truncate leading-tight">
                                            {t.name}
                                        </span>
                                        <span className="text-[11px] text-white/35 font-light tracking-wide truncate">
                                            {t.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}