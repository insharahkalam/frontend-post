import React, { useEffect, useState, useMemo } from "react";
import api from "../config/axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ArticleHero from "../components/ArticleHero";
import Footer from "../components/Footer";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

// Deterministic random function based on string seed
const seededRandom = (seed) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
};

// Generate consistent read time based on post ID
const getReadTimeForPost = (postId) => {
    const random = seededRandom(postId);
    return Math.floor(random * 60) + 1; // 1-60 minutes
};

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/posts/getAllPost");
                setPosts(res.data.getPost || []);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Add consistent read times to posts
    const postsWithReadTime = useMemo(() => {
        return posts.map(post => ({
            ...post,
            readTime: getReadTimeForPost(post._id || post.id || Math.random().toString()),
        }));
    }, [posts]);

    // Calculate stats including avg and totalMinutes
    const stats = useMemo(() => {
        if (!postsWithReadTime.length) return null;

        const totalMinutes = postsWithReadTime.reduce((sum, p) => sum + p.readTime, 0);
        const avg = Math.round(totalMinutes / postsWithReadTime.length);

        const latest = postsWithReadTime
            .map((p) => (p.createdAt ? new Date(p.createdAt) : null))
            .filter(Boolean)
            .sort((a, b) => b - a)[0];
        const categories = new Set(postsWithReadTime.map((p) => p.category).filter(Boolean));

        return {
            total: postsWithReadTime.length,
            categories: categories.size,
            avg,
            totalMinutes,
            latest: latest
                ? latest.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                : "—",
        };
    }, [postsWithReadTime]);

    if (loading) {
        return (
            <div style={sans} className="min-h-screen bg-[#0e0c0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-9 h-9 rounded-full border border-white/10 border-t-amber-300/80 animate-spin" />
                    <p className="text-white/30 text-[11px] tracking-[0.28em] uppercase">Fetching stories</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <ArticleHero />
            <div style={sans} className="min-h-screen bg-[#0e0c0a] px-4 sm:px-8 py-14 relative overflow-hidden">
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
                    {/* ================= HEADER (detailed) ================= */}
                    <div className="mb-14">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                            <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                            The Journal
                        </span>

                        <div className="mt-5 flex items-end justify-between gap-6 flex-wrap">
                            <div className="max-w-2xl">
                                <h1
                                    style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 50, 'WONK' 0" }}
                                    className="text-[2.4rem] sm:text-[3.6rem] leading-[1.02] font-light tracking-[-0.02em] text-[#f4ece0]"
                                >
                                    All{" "}
                                    <em
                                        style={{ ...serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
                                        className="italic font-normal text-amber-200/90"
                                    >
                                        Articles
                                    </em>
                                </h1>
                                <p className="text-[14px] text-white/45 font-light mt-4 leading-relaxed">
                                    A slow-read collection of essays, field notes and long-form work — hand-picked
                                    stories on craft, ideas and quiet observations. New pieces land whenever something
                                    worth publishing finally arrives, never on a schedule.
                                </p>

                                {/* Meta chips */}
                                {stats && (
                                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.28em] text-white/40">
                                        <span className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-300/70" />
                                            {stats.total} {stats.total === 1 ? "story" : "stories"}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-300/70" />
                                            {stats.categories || 1} {stats.categories === 1 ? "category" : "categories"}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-300/70" />
                                            ~{stats.avg} min avg read
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-300/70" />
                                            Updated {stats.latest}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {stats && (
                                <div className="text-right hidden sm:block">
                                    <div style={serif} className="text-amber-200/70 text-[3rem] leading-none italic">
                                        {String(stats.total).padStart(2, "0")}
                                    </div>
                                    <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">
                                        {stats.total === 1 ? "Entry" : "Entries"} · {stats.totalMinutes} min total
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-amber-200/[0.12] to-transparent mt-10" />
                    </div>

                    {/* Empty */}
                    {postsWithReadTime.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/[0.08] rounded-[22px]">
                            <div className="w-14 h-14 rounded-full bg-amber-300/[0.05] border border-amber-300/15 flex items-center justify-center mb-5">
                                <span style={serif} className="text-amber-200/70 text-xl italic">Ø</span>
                            </div>
                            <p style={serif} className="text-white/60 text-lg italic">Nothing published yet</p>
                            <p className="text-white/25 text-[12px] mt-2 tracking-wide">The first story is waiting to be written</p>
                        </div>
                    )}

                    {/* ================= ARTICLES ================= */}
                    <div className="flex flex-col">
                        {postsWithReadTime.map((post, index) => {
                            const authorObj = post.userId || post.user || {};
                            const authorName =
                                authorObj.name || authorObj.username || authorObj.fullName || "Unknown Author";
                            const authorImage = authorObj.image || null;
                            const authorInitial = authorName.charAt(0).toUpperCase();
                            const dateStr = post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString(undefined, {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "Recent";
                            const isEven = index % 2 === 1; // row-reverse (image on right)

                            return (
                                <React.Fragment key={post._id}>
                                    <article
                                        onClick={() => navigate(`/post/${post._id}`)}
                                        className={`group relative flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"
                                            } items-center gap-8 md:gap-16 py-14 cursor-pointer`}
                                    >
                                        {/* Index number with better z-index positioning */}
                                        <div
                                            style={serif}
                                            className={`absolute top-4 text-white/[0.08] text-[5.5rem] sm:text-[6rem] leading-none font-light italic select-none pointer-events-none ${isEven ? "left-2 md:left-4" : "right-2 md:right-4"
                                                }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        {/* Image */}
                                        <div className="relative w-full md:w-[52%] h-72 sm:h-80 md:h-[26rem] rounded-[20px] overflow-hidden bg-[#161210] shrink-0 z-10">
                                            {post.image ? (
                                                <img
                                                    src={post.image}
                                                    alt={post.title || "post"}
                                                    className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-[900ms] ease-out"
                                                />
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06),transparent_70%)]">
                                                    <span style={serif} className="text-white/15 text-4xl italic">—</span>
                                                    <span className="text-[11px] text-white/25 tracking-wide">No cover image</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                            <div className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-amber-100/90 font-medium uppercase tracking-[0.28em] z-20">
                                                {post.category || "Article"}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative flex flex-col w-full md:w-[48%] z-10">
                                            <div className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                                                <span className="text-amber-200/80">{post.readTime} min read</span>
                                                <span className="w-8 h-px bg-white/15" />
                                                <span className="text-white/40">{dateStr}</span>
                                            </div>

                                            <h2
                                                style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 40" }}
                                                className="italic font-normal text-amber-200/90 line-clamp-2 text-[2rem] sm:text-[2.6rem] leading-[1.08] tracking-[-0.015em] mt-5 group-hover:text-amber-100 transition-colors duration-500"
                                            >
                                                {post.title || "Untitled Article"}
                                            </h2>

                                            <p className="text-white/50 text-lg italic font-serif font-light leading-[1.4] mt-5 line-clamp-3">
                                                {post.content || "No summary available."}
                                            </p>

                                            <div className="flex items-center gap-3 mt-8">
                                                {authorImage ? (
                                                    <img
                                                        src={authorImage}
                                                        alt={authorName}
                                                        className="w-11 h-11 flex-shrink-0 rounded-full object-cover border border-amber-300/25 ring-2 ring-amber-300/[0.06]"
                                                    />
                                                ) : (
                                                    <div className="w-11 h-11 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
                                                        <span style={serif} className="text-[15px] italic text-amber-100">
                                                            {authorInitial}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-[13.5px] text-white/85 font-medium leading-tight">
                                                        {authorName}
                                                    </span>
                                                    <span className="text-[11px] text-white/35 font-light tracking-wide">
                                                        {authorObj.role || "Author"}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link to={`/post/${post._id}`} className="mt-8">
                                                <span
                                                    style={serif}
                                                    className="inline-flex items-center gap-3 text-[15px] italic text-amber-100/90 border-b border-amber-200/25 pb-1.5 group-hover:border-amber-200/70 transition-colors duration-500"
                                                >
                                                    Read the full story
                                                    <span className="not-italic transition-transform duration-500 group-hover:translate-x-1.5">
                                                        →
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>
                                    </article>

                                    {index !== postsWithReadTime.length - 1 && (
                                        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
