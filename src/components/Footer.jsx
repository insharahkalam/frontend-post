import React from "react";
import { NavLink } from "react-router-dom";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

export default function Footer() {
    return (
        <footer style={sans} className="relative overflow-hidden bg-[#0e0c0a] border-t border-white/[0.06]">
            {/* Warm ambient glow, echoing the hero */}
            <div className="pointer-events-none absolute -bottom-48 left-1/3 w-[520px] h-[520px] bg-amber-500/[0.05] rounded-full blur-[120px]" />

            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 pb-10 relative">
                <div className="grid md:grid-cols-12 gap-10 md:gap-14">

                    {/* Masthead + tagline */}
                    <div className="md:col-span-5">
                        <span
                            style={serif}
                            className="font-normal text-[1.3rem] text-[#f4ece0] italic tracking-tight"
                        >
                            The<em className="not-italic text-amber-200/90"> Journal</em>
                        </span>
                        <p className="mt-4 text-white/40 text-[13.5px] font-light leading-[1.8] max-w-xs">
                            Long-form essays, field notes and interviews for readers who
                            still like to slow down.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-white/30">
                            <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                            Vol. 01 · Est. 2025
                        </div>
                    </div>

                    {/* Navigate */}
                    <div className="md:col-span-3">
                        <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/35">
                            Navigate
                        </span>
                        <ul className="mt-5 space-y-3">
                            <li>
                                <NavLink to="/" end className="text-[13.5px] text-white/55 font-light hover:text-amber-200/90 transition-colors">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/mypost" className="text-[13.5px] text-white/55 font-light hover:text-amber-200/90 transition-colors">
                                    My Articles
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/create" className="text-[13.5px] text-white/55 font-light hover:text-amber-200/90 transition-colors">
                                    Write
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Topics */}
                    <div className="md:col-span-2">
                        <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/35">
                            Topics
                        </span>
                        <ul className="mt-5 space-y-3">
                            {["Technology", "Culture", "Science", "Design"].map((t) => (
                                <li key={t} className="text-[13.5px] text-white/55 font-light hover:text-amber-200/90 transition-colors cursor-pointer">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Editor's note style CTA, echoes hero sidebar */}
                    <div className="md:col-span-2">
                        <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/35">
                            Stay in touch
                        </span>
                        <p style={serif} className="mt-5 text-[15px] italic font-light text-[#f4ece0] leading-snug">
                            “New pieces land when they’re ready.”
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-14 h-px bg-white/[0.06]" />

                {/* Bottom bar */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/25 font-light">
                    <span>© {new Date().getFullYear()} The Journal. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-amber-200/80 transition-colors cursor-pointer">Privacy</span>
                        <span className="hover:text-amber-200/80 transition-colors cursor-pointer">Terms</span>
                        <span className="hover:text-amber-200/80 transition-colors cursor-pointer">Contact</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}