import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const emailRef = useRef(null);

    // Inject fonts + Tailwind CDN + Tailwind config (only once)
    useEffect(() => {
        if (!document.getElementById("longhand-fonts")) {
            const preconnect = document.createElement("link");
            preconnect.rel = "preconnect";
            preconnect.href = "https://fonts.googleapis.com";
            document.head.appendChild(preconnect);

            const fontLink = document.createElement("link");
            fontLink.id = "longhand-fonts";
            fontLink.rel = "stylesheet";
            fontLink.href =
                "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
            document.head.appendChild(fontLink);
        }

        if (!document.getElementById("longhand-tailwind-cdn")) {
            const script = document.createElement("script");
            script.id = "longhand-tailwind-cdn";
            script.src = "https://cdn.tailwindcss.com";
            script.onload = () => {
                if (window.tailwind) {
                    window.tailwind.config = {
                        theme: {
                            extend: {
                                colors: {
                                    ink: "#14171F",
                                    inksoft: "#1E2330",
                                    paper: "#F3EFE4",
                                    paperdim: "#EAE4D4",
                                    marigold: "#E8A33D",
                                    teal: "#1F6F54",
                                    crimson: "#B23A2E",
                                },
                                fontFamily: {
                                    display: ["Fraunces", "serif"],
                                    body: ["Inter", "sans-serif"],
                                    mono: ["IBM Plex Mono", "monospace"],
                                },
                            },
                        },
                    };
                }
            };
            document.head.appendChild(script);
        }
    }, []);

    // Scroll reveal
    useEffect(() => {
        const revealEls = document.querySelectorAll(
            ".reveal, .reveal-stagger, .mark-underline"
        );
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        revealEls.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    // Stat counters
    useEffect(() => {
        const counters = document.querySelectorAll(".counter");
        const counterIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = parseFloat(el.dataset.target);
                    const suffix = el.dataset.suffix || "";
                    const isDecimal = target % 1 !== 0;
                    const duration = 1600;
                    const start = performance.now();
                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const value = target * eased;
                        el.textContent =
                            (isDecimal
                                ? value.toFixed(1)
                                : Math.floor(value).toLocaleString()) + suffix;
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                    counterIO.unobserve(el);
                });
            },
            { threshold: 0.4 }
        );
        counters.forEach((el) => counterIO.observe(el));
        return () => counterIO.disconnect();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (emailRef.current && emailRef.current.value) {
            setSubscribed(true);
            emailRef.current.value = "";
        }
    };

    return (
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

            {/* ============ NAVBAR ============ */}
            <header
                id="navbar"
                className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
            >
                <div className="nav-blur border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="flex items-center justify-between h-[72px]">
                            <a href="#top" className="flex items-center gap-2.5 focus-ring rounded">
                                <span className="font-display italic text-2xl text-paper tracking-tight">
                                    Longhand
                                </span>
                                <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-marigold border border-marigold/40 rounded-full px-2 py-0.5">
                                    Vol. 12
                                </span>
                            </a>
                            <nav className="hidden lg:flex items-center gap-9 font-medium text-sm text-paper/80">
                                <a href="#featured" className="hover:text-marigold transition-colors focus-ring rounded">
                                    Featured
                                </a>
                                <a href="#categories" className="hover:text-marigold transition-colors focus-ring rounded">
                                    Categories
                                </a>
                                <a href="#latest" className="hover:text-marigold transition-colors focus-ring rounded">
                                    Latest
                                </a>
                                <a href="#trending" className="hover:text-marigold transition-colors focus-ring rounded">
                                    Trending
                                </a>
                                <a href="#authors" className="hover:text-marigold transition-colors focus-ring rounded">
                                    Authors
                                </a>
                                <a href="#newsletter" className="hover:text-marigold transition-colors focus-ring rounded">
                                    Newsletter
                                </a>
                            </nav>
                            <div className="flex items-center gap-4">
                                <button
                                    aria-label="Search articles"
                                    className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-paper/80 hover:text-marigold hover:bg-white/5 transition-colors focus-ring"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </button>
                                <a
                                    href="#newsletter"
                                    className="bg-marigold text-ink text-sm font-semibold px-4 py-2 rounded-full hover:bg-paper transition-colors focus-ring"
                                >
                                    Subscribe
                                </a>
                                <button
                                    id="menuBtn"
                                    aria-label="Open menu"
                                    className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center focus-ring rounded"
                                    onClick={() => setMenuOpen((v) => !v)}
                                >
                                    <span className="block w-5 h-[2px] bg-paper"></span>
                                    <span className="block w-5 h-[2px] bg-paper"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <div
                    id="mobileMenu"
                    className={`${menuOpen ? "" : "hidden"} lg:hidden bg-ink border-b border-white/10`}
                >
                    <nav className="flex flex-col px-6 py-4 gap-4 font-medium text-paper/80">
                        <a href="#featured" className="hover:text-marigold">Featured</a>
                        <a href="#categories" className="hover:text-marigold">Categories</a>
                        <a href="#latest" className="hover:text-marigold">Latest</a>
                        <a href="#trending" className="hover:text-marigold">Trending</a>
                        <a href="#authors" className="hover:text-marigold">Authors</a>
                        <a href="#newsletter" className="hover:text-marigold">Newsletter</a>
                    </nav>
                </div>
            </header>

            {/* ============ HERO ============ */}
            <section id="top" className="relative bg-ink text-paper pt-40 pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
                
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

            {/* ============ FEATURED ARTICLE ============ */}
            <section id="featured" className="bg-paper py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex items-baseline justify-between mb-12 reveal">
                        <h2 className="font-display text-3xl lg:text-4xl">Featured</h2>
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
                            Editor's pick
                        </span>
                    </div>

                    <article className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center reveal">
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
                        <div className="lg:col-span-5">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-4">
                                12 min read · July 2, 2026
                            </p>
                            <h3 className="font-display font-medium text-3xl lg:text-[2.6rem] leading-[1.05] mb-5">
                                The Quiet Return of Handwriting in a Typed World
                            </h3>
                            <p className="text-ink/70 leading-relaxed mb-6">
                                After two decades of keyboards and keystrokes, a growing
                                number of scientists, students, and CEOs are reaching for
                                pens again — not out of nostalgia, but because the friction
                                of handwriting seems to be doing something typing can't.
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

            {/* ============ CATEGORIES ============ */}
            <section id="categories" className="bg-paperdim py-24 lg:py-28 border-y border-ink/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="mb-12 reveal">
                        <h2 className="font-display text-3xl lg:text-4xl">Browse by category</h2>
                        <p className="text-ink/60 mt-3 max-w-lg">
                            Six beats, one newsroom — pick a thread and pull it.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 reveal-stagger">
                        <a href="#latest" className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4">
                            <span className="tag-dot bg-teal"></span>
                            <div>
                                <p className="font-display text-xl">Technology</p>
                                <p className="text-sm text-ink/50 mt-1">142 articles</p>
                            </div>
                        </a>
                        <a href="#latest" className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4">
                            <span className="tag-dot bg-marigold"></span>
                            <div>
                                <p className="font-display text-xl">Culture</p>
                                <p className="text-sm text-ink/50 mt-1">98 articles</p>
                            </div>
                        </a>
                        <a href="#latest" className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4">
                            <span className="tag-dot bg-crimson"></span>
                            <div>
                                <p className="font-display text-xl">Science</p>
                                <p className="text-sm text-ink/50 mt-1">76 articles</p>
                            </div>
                        </a>
                        <a href="#latest" className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4">
                            <span className="tag-dot bg-ink"></span>
                            <div>
                                <p className="font-display text-xl">Business</p>
                                <p className="text-sm text-ink/50 mt-1">64 articles</p>
                            </div>
                        </a>
                        <a href="#latest" className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4">
                            <span className="tag-dot bg-teal"></span>
                            <div>
                                <p className="font-display text-xl">Design</p>
                                <p className="text-sm text-ink/50 mt-1">51 articles</p>
                            </div>
                        </a>
                        <a href="#latest" className="card-lift group bg-paper rounded-2xl p-6 border border-ink/10 flex flex-col gap-4">
                            <span className="tag-dot bg-marigold"></span>
                            <div>
                                <p className="font-display text-xl">Environment</p>
                                <p className="text-sm text-ink/50 mt-1">39 articles</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ============ LATEST ARTICLES ============ */}
            <section id="latest" className="bg-paper py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex items-baseline justify-between mb-12 reveal">
                        <h2 className="font-display text-3xl lg:text-4xl">Latest articles</h2>
                        <a href="#" className="text-sm font-semibold border-b-2 border-ink hover:border-marigold hover:text-marigold transition-colors focus-ring">
                            View archive
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
                        {/* card 1 */}
                        <article className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Robotic arms assembling machine parts on a factory line"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal mb-3">
                                    Technology · 8 min
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">
                                    Inside the Factories Building Robots That Build Robots
                                </h3>
                                <p className="text-sm text-ink/60 mb-4">
                                    A look at the recursive supply chain quietly reshaping industrial automation.
                                </p>
                                <p className="text-xs text-ink/50">David Okafor · July 1, 2026</p>
                            </div>
                        </article>
                        {/* card 2 */}
                        <article className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1497436072909-f5e4be1713f9?w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Sunlit coral reef with fish swimming"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-crimson mb-3">
                                    Science · 10 min
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">
                                    Why Coral Reefs Are Learning to Move
                                </h3>
                                <p className="text-sm text-ink/60 mb-4">
                                    Marine biologists are relocating entire reef colonies before the water gets too warm to wait.
                                </p>
                                <p className="text-xs text-ink/50">Priya Chandran · June 29, 2026</p>
                            </div>
                        </article>
                        {/* card 3 */}
                        <article className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Team meeting around a table with laptops and notebooks"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/60 mb-3">
                                    Business · 7 min
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">
                                    The Four-Day Week Is Quietly Rewriting Management
                                </h3>
                                <p className="text-sm text-ink/60 mb-4">
                                    Fewer hours are forcing managers to finally decide what actually matters.
                                </p>
                                <p className="text-xs text-ink/50">Tomas Reyes · June 27, 2026</p>
                            </div>
                        </article>
                        {/* card 4 */}
                        <article className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Pedestrians crossing a busy city street"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal mb-3">
                                    Design · 9 min
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">
                                    What Makes a City Walkable, According to the People Who Walk It
                                </h3>
                                <p className="text-sm text-ink/60 mb-4">
                                    Urban planners are trading satellite data for shoe leather — with better results.
                                </p>
                                <p className="text-xs text-ink/50">Elena Marsh · June 24, 2026</p>
                            </div>
                        </article>
                        {/* card 5 */}
                        <article className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Old paper map on a wooden table"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-marigold mb-3">
                                    Culture · 11 min
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">
                                    The Last Cartographers: Mapping Places GPS Can't Reach
                                </h3>
                                <p className="text-sm text-ink/60 mb-4">
                                    A dying craft is being kept alive by the handful of places satellites still can't chart.
                                </p>
                                <p className="text-xs text-ink/50">David Okafor · June 21, 2026</p>
                            </div>
                        </article>
                        {/* card 6 */}
                        <article className="card-lift bg-paperdim rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
                            <div className="img-zoom h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"
                                    className="w-full h-full object-cover"
                                    alt="Solar panels and wind turbines in a green field"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-crimson mb-3">
                                    Environment · 8 min
                                </p>
                                <h3 className="font-display text-xl leading-snug mb-3 flex-1">
                                    Small Modular Reactors and the Return of Nuclear Optimism
                                </h3>
                                <p className="text-sm text-ink/60 mb-4">
                                    A new generation of smaller, cheaper reactors is changing minds on the grid of the future.
                                </p>
                                <p className="text-xs text-ink/50">Priya Chandran · June 18, 2026</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* ============ TRENDING ARTICLES ============ */}
            <section id="trending" className="bg-ink text-paper py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex items-baseline justify-between mb-12 reveal">
                        <h2 className="font-display text-3xl lg:text-4xl">Trending this week</h2>
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
                            Ranked by reads
                        </span>
                    </div>

                    <div className="divide-y divide-white/10 reveal-stagger">
                        <a href="#" className="group flex items-center gap-6 lg:gap-10 py-6 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors">
                            <span className="font-display italic text-4xl lg:text-5xl text-marigold w-14 spine-num">01</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal mb-1">Technology</p>
                                <h3 className="font-display text-xl lg:text-2xl truncate group-hover:text-marigold transition-colors">
                                    The Economics of Attention: Why Nothing Is Free
                                </h3>
                            </div>
                            <span className="hidden sm:block font-mono text-sm text-paper/50">184K reads</span>
                        </a>
                        <a href="#" className="group flex items-center gap-6 lg:gap-10 py-6 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors">
                            <span className="font-display italic text-4xl lg:text-5xl text-marigold w-14 spine-num">02</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-crimson mb-1">Culture</p>
                                <h3 className="font-display text-xl lg:text-2xl truncate group-hover:text-marigold transition-colors">
                                    The Quiet Return of Handwriting in a Typed World
                                </h3>
                            </div>
                            <span className="hidden sm:block font-mono text-sm text-paper/50">161K reads</span>
                        </a>
                        <a href="#" className="group flex items-center gap-6 lg:gap-10 py-6 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors">
                            <span className="font-display italic text-4xl lg:text-5xl text-marigold w-14 spine-num">03</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal mb-1">Science</p>
                                <h3 className="font-display text-xl lg:text-2xl truncate group-hover:text-marigold transition-colors">
                                    Why Coral Reefs Are Learning to Move
                                </h3>
                            </div>
                            <span className="hidden sm:block font-mono text-sm text-paper/50">139K reads</span>
                        </a>
                        <a href="#" className="group flex items-center gap-6 lg:gap-10 py-6 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors">
                            <span className="font-display italic text-4xl lg:text-5xl text-marigold w-14 spine-num">04</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40 text-paper/40 mb-1">Business</p>
                                <h3 className="font-display text-xl lg:text-2xl truncate group-hover:text-marigold transition-colors">
                                    The Four-Day Week Is Quietly Rewriting Management
                                </h3>
                            </div>
                            <span className="hidden sm:block font-mono text-sm text-paper/50">112K reads</span>
                        </a>
                        <a href="#" className="group flex items-center gap-6 lg:gap-10 py-6 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors">
                            <span className="font-display italic text-4xl lg:text-5xl text-marigold w-14 spine-num">05</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-marigold mb-1">Design</p>
                                <h3 className="font-display text-xl lg:text-2xl truncate group-hover:text-marigold transition-colors">
                                    What Makes a City Walkable, According to the People Who Walk It
                                </h3>
                            </div>
                            <span className="hidden sm:block font-mono text-sm text-paper/50">97K reads</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ============ AUTHORS ============ */}
            <section id="authors" className="bg-paper py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="mb-12 reveal">
                        <h2 className="font-display text-3xl lg:text-4xl">The newsroom</h2>
                        <p className="text-ink/60 mt-3 max-w-lg">
                            Four bylines you'll start recognizing before the second paragraph.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-stagger">
                        <div className="group text-center">
                            <div className="img-zoom rounded-full w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-5 ring-4 ring-paperdim">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80"
                                    className="w-full h-full object-cover rounded-full"
                                    alt="Portrait of Elena Marsh"
                                />
                            </div>
                            <p className="font-display text-lg">Elena Marsh</p>
                            <p className="text-xs font-mono uppercase tracking-wide text-ink/50 mt-1">Senior Editor</p>
                            <p className="text-sm text-ink/60 mt-2 px-2">Culture &amp; ideas, 14 years in.</p>
                        </div>
                        <div className="group text-center">
                            <div className="img-zoom rounded-full w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-5 ring-4 ring-paperdim">
                                <img
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80"
                                    className="w-full h-full object-cover rounded-full"
                                    alt="Portrait of David Okafor"
                                />
                            </div>
                            <p className="font-display text-lg">David Okafor</p>
                            <p className="text-xs font-mono uppercase tracking-wide text-ink/50 mt-1">Technology Correspondent</p>
                            <p className="text-sm text-ink/60 mt-2 px-2">Follows the machines that build machines.</p>
                        </div>
                        <div className="group text-center">
                            <div className="img-zoom rounded-full w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-5 ring-4 ring-paperdim">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"
                                    className="w-full h-full object-cover rounded-full"
                                    alt="Portrait of Priya Chandran"
                                />
                            </div>
                            <p className="font-display text-lg">Priya Chandran</p>
                            <p className="text-xs font-mono uppercase tracking-wide text-ink/50 mt-1">Science Writer</p>
                            <p className="text-sm text-ink/60 mt-2 px-2">Explains the ocean without drowning you in jargon.</p>
                        </div>
                        <div className="group text-center">
                            <div className="img-zoom rounded-full w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-5 ring-4 ring-paperdim">
                                <img
                                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=300&q=80"
                                    className="w-full h-full object-cover rounded-full"
                                    alt="Portrait of Tomas Reyes"
                                />
                            </div>
                            <p className="font-display text-lg">Tomas Reyes</p>
                            <p className="text-xs font-mono uppercase tracking-wide text-ink/50 mt-1">Business Editor</p>
                            <p className="text-sm text-ink/60 mt-2 px-2">Ten years covering how people actually work.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ STATISTICS ============ */}
            <section className="bg-ink text-paper py-24 lg:py-28 relative overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-teal/10 blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                    <div className="mb-14 reveal">
                        <h2 className="font-display text-3xl lg:text-4xl">Longhand, by the numbers</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 reveal-stagger">
                        <div className="border-l-2 border-marigold pl-5">
                            <p className="font-mono text-4xl lg:text-5xl font-semibold counter" data-target="2.4" data-suffix="M">0</p>
                            <p className="text-paper/60 mt-2 text-sm">Monthly readers</p>
                        </div>
                        <div className="border-l-2 border-teal pl-5">
                            <p className="font-mono text-4xl lg:text-5xl font-semibold counter" data-target="18600" data-suffix="+">0</p>
                            <p className="text-paper/60 mt-2 text-sm">Articles published</p>
                        </div>
                        <div className="border-l-2 border-crimson pl-5">
                            <p className="font-mono text-4xl lg:text-5xl font-semibold counter" data-target="142" data-suffix="">0</p>
                            <p className="text-paper/60 mt-2 text-sm">Countries reached</p>
                        </div>
                        <div className="border-l-2 border-marigold pl-5">
                            <p className="font-mono text-4xl lg:text-5xl font-semibold counter" data-target="6" data-suffix=" min">0</p>
                            <p className="text-paper/60 mt-2 text-sm">Average read time</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ NEWSLETTER ============ */}
            <section id="newsletter" className="bg-marigold text-ink py-24 lg:py-28">
                <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center reveal">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4">The Weekly Marginalia</p>
                    <h2 className="font-display font-medium text-4xl lg:text-5xl leading-tight mb-5">
                        One email, every Sunday. No filler.
                    </h2>
                    <p className="text-ink/70 max-w-xl mx-auto mb-10">
                        Five stories worth your coffee, curated by our editors and delivered before the week gets loud.
                    </p>
                    <form
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        onSubmit={handleNewsletterSubmit}
                    >
                        <label htmlFor="newsletterEmail" className="sr-only">Email address</label>
                        <input
                            id="newsletterEmail"
                            ref={emailRef}
                            type="email"
                            required
                            placeholder="you@email.com"
                            className="flex-1 px-5 py-3.5 rounded-full border-2 border-ink/20 bg-paper focus:border-ink outline-none transition-colors focus-ring"
                        />
                        <button
                            type="submit"
                            className={`font-semibold px-6 py-3.5 rounded-full transition-colors focus-ring ${subscribed ? "bg-ink text-paper" : "bg-ink text-paper hover:bg-inksoft"
                                }`}
                        >
                            {subscribed ? "Subscribed ✓" : "Subscribe"}
                        </button>
                    </form>
                    <p className="text-xs text-ink/50 mt-4">No spam. Unsubscribe with one click, any time.</p>
                </div>
            </section>

            {/* ============ TESTIMONIALS ============ */}
            <section className="bg-paper py-24 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14 reveal">
                    <h2 className="font-display text-3xl lg:text-4xl">What readers underline</h2>
                </div>
                <div className="relative">
                    <div className="flex gap-8 marquee-track w-max">
                        {/* set 1 */}
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "Longhand is the only newsletter I read start to finish. Everything else I skim."
                            </p>
                            <p className="text-sm font-semibold">Amara T.</p>
                            <p className="text-xs text-ink/50">Subscriber since 2022</p>
                        </div>
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "It reads like a magazine that still respects your attention span."
                            </p>
                            <p className="text-sm font-semibold">Jonas K.</p>
                            <p className="text-xs text-ink/50">Product designer</p>
                        </div>
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "I forward the trending list to my whole team every Friday."
                            </p>
                            <p className="text-sm font-semibold">Farah S.</p>
                            <p className="text-xs text-ink/50">Operations lead</p>
                        </div>
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "The science coverage is the rare kind that doesn't oversimplify."
                            </p>
                            <p className="text-sm font-semibold">Rui M.</p>
                            <p className="text-xs text-ink/50">Researcher</p>
                        </div>
                        {/* duplicate set for seamless loop */}
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "Longhand is the only newsletter I read start to finish. Everything else I skim."
                            </p>
                            <p className="text-sm font-semibold">Amara T.</p>
                            <p className="text-xs text-ink/50">Subscriber since 2022</p>
                        </div>
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "It reads like a magazine that still respects your attention span."
                            </p>
                            <p className="text-sm font-semibold">Jonas K.</p>
                            <p className="text-xs text-ink/50">Product designer</p>
                        </div>
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "I forward the trending list to my whole team every Friday."
                            </p>
                            <p className="text-sm font-semibold">Farah S.</p>
                            <p className="text-xs text-ink/50">Operations lead</p>
                        </div>
                        <div className="w-[380px] shrink-0 bg-paperdim border border-ink/10 rounded-2xl p-8">
                            <p className="font-display italic text-xl leading-snug mb-6">
                                "The science coverage is the rare kind that doesn't oversimplify."
                            </p>
                            <p className="text-sm font-semibold">Rui M.</p>
                            <p className="text-xs text-ink/50">Researcher</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FOOTER ============ */}
            <footer className="bg-ink text-paper pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
                        <div className="lg:col-span-4">
                            <span className="font-display italic text-2xl">Longhand</span>
                            <p className="text-paper/60 mt-4 max-w-xs text-sm leading-relaxed">
                                A slow-read journal for people who still underline things. Published weekly since 2014.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-marigold hover:text-marigold transition-colors focus-ring">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.5 22H1.4l8.1-9.3L1 2h7l4.9 6.3L18.9 2Z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-marigold hover:text-marigold transition-colors focus-ring">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-marigold hover:text-marigold transition-colors focus-ring">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.82 0-2.1 1.4-2.1 2.86V21h-4V9Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/40 mb-4">Sections</p>
                            <ul className="space-y-3 text-sm text-paper/70">
                                <li><a href="#featured" className="hover:text-marigold transition-colors">Featured</a></li>
                                <li><a href="#categories" className="hover:text-marigold transition-colors">Categories</a></li>
                                <li><a href="#latest" className="hover:text-marigold transition-colors">Latest</a></li>
                                <li><a href="#trending" className="hover:text-marigold transition-colors">Trending</a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-2">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/40 mb-4">Journal</p>
                            <ul className="space-y-3 text-sm text-paper/70">
                                <li><a href="#authors" className="hover:text-marigold transition-colors">Authors</a></li>
                                <li><a href="#" className="hover:text-marigold transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-marigold transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-marigold transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-4">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/40 mb-4">Stay in the margins</p>
                            <p className="text-sm text-paper/60 mb-4">Get the Sunday edition in your inbox.</p>
                            <a href="#newsletter" className="inline-flex items-center gap-2 bg-marigold text-ink font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-paper transition-colors focus-ring">
                                Subscribe now
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-paper/40">
                        <p>© 2026 Longhand Journal. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-paper/70">Privacy</a>
                            <a href="#" className="hover:text-paper/70">Terms</a>
                            <a href="#" className="hover:text-paper/70">RSS</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}