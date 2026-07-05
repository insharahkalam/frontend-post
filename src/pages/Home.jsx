import { useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Featured from "../components/Featured"
import Categories from "../components/Categories"
import LatestArticles from "../components/LatestArticles"
import Trending from "../components/Trending"
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"

export default function Home() {

    // Inject fonts + Tailwind CDN (once)
    useEffect(() => {
        if (!document.getElementById("longhand-fonts")) {
            const preconnect = document.createElement("link")
            preconnect.rel = "preconnect"
            preconnect.href = "https://fonts.googleapis.com"
            document.head.appendChild(preconnect)

            const fontLink = document.createElement("link")
            fontLink.id = "longhand-fonts"
            fontLink.rel = "stylesheet"
            fontLink.href =
                "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
            document.head.appendChild(fontLink)
        }

        if (!document.getElementById("longhand-tailwind-cdn")) {
            const script = document.createElement("script")
            script.id = "longhand-tailwind-cdn"
            script.src = "https://cdn.tailwindcss.com"
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
                    }
                }
            }
            document.head.appendChild(script)
        }
    }, [])

    // Scroll reveal
    useEffect(() => {
        const revealEls = document.querySelectorAll(".reveal, .reveal-stagger, .mark-underline")
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target) }
                })
            },
            { threshold: 0.15 }
        )
        revealEls.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [])

    // Counter animation
    useEffect(() => {
        const counters = document.querySelectorAll(".counter")
        const counterIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    const el = entry.target
                    const target = parseFloat(el.dataset.target)
                    const suffix = el.dataset.suffix || ""
                    const isDecimal = target % 1 !== 0
                    const duration = 1600
                    const start = performance.now()
                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        const value = target * eased
                        el.textContent =
                            (isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString()) + suffix
                        if (progress < 1) requestAnimationFrame(tick)
                    }
                    requestAnimationFrame(tick)
                    counterIO.unobserve(el)
                })
            },
            { threshold: 0.4 }
        )
        counters.forEach((el) => counterIO.observe(el))
        return () => counterIO.disconnect()
    }, [])

    return (
        <div className="font-body text-ink antialiased">
            <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #F3EFE4; }
        ::selection { background: #E8A33D; color: #14171F; }

        .reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(.2,.8,.2,1), transform 0.8s cubic-bezier(.2,.8,.2,1);
        }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }

        .reveal-stagger > * {
          opacity: 0; transform: translateY(20px);
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

        .spine-num { font-variant-numeric: tabular-nums; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal-stagger > *, .mark-underline, .card-lift, .img-zoom img {
            transition: none !important; animation: none !important;
            opacity: 1 !important; transform: none !important;
            background-size: 100% 0.4em !important;
          }
          .marquee-track { animation: none !important; }
        }

        .focus-ring:focus-visible { outline: 3px solid #E8A33D; outline-offset: 3px; }
        .tag-dot { width: 7px; height: 7px; border-radius: 999px; display: inline-block; }
      `}</style>

            <Navbar />
            <Hero />
            <Featured />
            <Categories />
            <LatestArticles />
            <Trending />
            <Newsletter />
            <Testimonials />
            <Footer />
        </div>
    )
}