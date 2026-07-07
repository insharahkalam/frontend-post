import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await api.get(`/posts/getOnePost/${id}`);
                setPost(res.data.post);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    // Reading progress bar
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
            setProgress(Math.min(100, Math.max(0, scrolled * 100)));
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const getReadTime = (content) => {
        if (!content) return 1;
        const words = content.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
    };

    if (loading) {
        return (
            <div style={sans} className="min-h-screen bg-[#0e0c0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-9 h-9 rounded-full border border-white/10 border-t-amber-300/80 animate-spin" />
                    <p className="text-white/30 text-[11px] tracking-[0.28em] uppercase">Fetching story</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={sans} className="min-h-screen bg-[#0e0c0a] flex items-center justify-center px-4">
                <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-amber-300/[0.05] border border-amber-300/15 flex items-center justify-center mb-5">
                        <span style={serif} className="text-amber-200/70 text-xl italic">Ø</span>
                    </div>
                    <p style={serif} className="text-white/60 text-lg italic">Story not found</p>
                    <p className="text-white/25 text-[12px] mt-2 tracking-wide">It may have been removed or never existed</p>
                    <button
                        onClick={() => navigate(-1)}
                        style={serif}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-300/10 border border-amber-300/25 text-amber-100 text-[14px] italic hover:bg-amber-300/[0.15] transition-all duration-300"
                    >
                        ← Go back
                    </button>
                </div>
            </div>
        );
    }

    const authorObj = post.userId || post.user || {};
    const authorName = authorObj.username || authorObj.name || authorObj.fullName || "Unknown Author";
    const authorImage = authorObj.image || null;
    const authorInitial = authorName.charAt(0).toUpperCase();
    const dateStr = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "Recent";
    const readTime = getReadTime(post.content);
    const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;
    const content = post.content || "No content available.";
    const firstLetter = content.charAt(0);
    const restContent = content.slice(1);

    return (
        <>
            <Navbar />

            {/* Reading progress */}
            <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/[0.04]">
                <div
                    className="h-full bg-gradient-to-r from-amber-300/80 via-amber-200 to-rose-300/70 transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div style={sans} className="min-h-screen bg-[#0e0c0a] relative overflow-hidden">
                {/* Ambient glows */}
                <div className="pointer-events-none absolute -top-52 -left-40 w-[560px] h-[560px] bg-amber-500/[0.05] rounded-full blur-[120px]" />
                <div className="pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] bg-rose-500/[0.035] rounded-full blur-[120px]" />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
                    }}
                />

                {/* ===== HERO ===== */}
                <header className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-12">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Kicker */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <span className="h-px w-10 bg-amber-300/30" />
                            <span className="inline-flex items-center gap-2 text-amber-200/80 text-[10.5px] font-medium uppercase tracking-[0.32em]">
                                <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                                {post.category || "Feature"}
                            </span>
                            <span className="h-px w-10 bg-amber-300/30" />
                        </div>

                        {/* Title */}
                        <h1
                            style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}
                            className="text-[2.4rem] sm:text-[3.6rem] lg:text-[4.2rem] leading-[1.05] font-light tracking-[-0.025em] text-[#f4ece0]"
                        >
                            {post.title || "Untitled Article"}
                        </h1>

                        {/* Short description as dek */}
                        {post.shortDescription && (
                            <p
                                style={{ ...serif, fontVariationSettings: "'SOFT' 40" }}
                                className="mt-7 text-[17px] sm:text-[20px] italic font-light text-white/55 leading-[1.55] max-w-2xl mx-auto"
                            >
                                {post.shortDescription}
                            </p>
                        )}

                        {/* Byline strip */}
                        <div className="mt-10 flex items-center justify-center gap-5 sm:gap-7 text-[12px] text-white/45 tracking-wide">
                            <div className="flex items-center gap-2.5">
                                {authorImage ? (
                                    <img
                                        src={authorImage}
                                        alt={authorName}
                                        className="w-7 h-7 rounded-full object-cover border border-amber-300/25"
                                    />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
                                        <span style={serif} className="text-[11px] italic text-amber-100">
                                            {authorInitial}
                                        </span>
                                    </div>
                                )}
                                <span className="text-white/75">{authorName}</span>
                            </div>
                            <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                            <span>{dateStr}</span>
                            <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </header>

                {/* ===== Cover Image ===== */}
                {post.image ? (
                    <figure className="relative max-w-5xl mx-auto px-5 sm:px-8">
                        <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-[#161210] border border-white/[0.06]">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/60 via-transparent to-transparent" />
                        </div>
                    </figure>
                ) : (
                    <div className="max-w-5xl mx-auto px-5 sm:px-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                    </div>
                )}

                {/* ===== ARTICLE BODY ===== */}
                <article className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
                        {/* Side rail — sticky meta */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 space-y-8">
                                <div>
                                    <span className="text-[9.5px] text-white/30 uppercase tracking-[0.28em]">Published</span>
                                    <p style={serif} className="text-[15px] text-[#f4ece0]/85 italic mt-2 leading-snug">
                                        {dateStr}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-[9.5px] text-white/30 uppercase tracking-[0.28em]">Reading</span>
                                    <p style={serif} className="text-[15px] text-[#f4ece0]/85 italic mt-2">
                                        {readTime} minutes
                                    </p>
                                    <p className="text-[11px] text-white/30 mt-1">{wordCount.toLocaleString()} words</p>
                                </div>
                                <div>
                                    <span className="text-[9.5px] text-white/30 uppercase tracking-[0.28em]">Filed under</span>
                                    <p className="text-[12.5px] text-amber-200/80 tracking-wide mt-2 uppercase">
                                        {post.category || "Article"}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-white/[0.06]">
                                    <span className="text-[9.5px] text-white/30 uppercase tracking-[0.28em] block mb-3">
                                        Share
                                    </span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard?.writeText(window.location.href);
                                        }}
                                        className="text-[12px] text-white/50 hover:text-amber-200 transition-colors tracking-wide"
                                    >
                                        Copy link ↗
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* Main column */}
                        <div className="max-w-[68ch]">
                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-[10px] text-amber-200/70 uppercase tracking-[0.3em] font-medium">
                                    The full story
                                </span>
                                <span className="h-px flex-1 bg-gradient-to-r from-amber-300/25 to-transparent" />
                            </div>

                            {/* Body with drop cap */}
                            <div
                                style={{ ...serif, fontVariationSettings: "'SOFT' 20" }}
                                className="text-white/70 text-[17.5px] sm:text-[19px] font-light leading-[1.9] whitespace-pre-line"
                            >
                                {post.content && (
                                    <>
                                        <span
                                            style={{
                                                ...serif,
                                                fontVariationSettings: "'SOFT' 80, 'WONK' 1",
                                            }}
                                            className="float-left text-[5.5rem] sm:text-[6.5rem] leading-[0.85] font-light text-amber-200/90 mr-3 mt-2 mb-1"
                                        >
                                            {firstLetter}
                                        </span>
                                        {restContent}
                                    </>
                                )}
                                {!post.content && "No content available."}
                            </div>

                            {/* End mark */}
                            <div className="mt-14 flex items-center justify-center gap-4">

                                <span style={serif} className="text-amber-200/70 text-lg italic">
                                    ⁂
                                </span>

                                <span className="h-px w-30 bg-amber-300/40" />
                                <span style={serif} className="text-amber-200/70 text-lg italic">
                                    ⁂
                                </span>

                                <span className="h-px w-30 bg-amber-300/40" />
                                <span style={serif} className="text-amber-200/70 text-lg italic">
                                    ⁂
                                </span>
                            </div>


                            {/* Back to all */}
                            <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/[0.06]">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[13px] font-medium tracking-wide hover:bg-amber-300/[0.14] hover:border-amber-300/35 hover:text-amber-100 transition-all duration-300"
                                >
                                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                                    All articles
                                </button>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    style={serif}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-amber-100/85 text-[13px] italic tracking-wide hover:bg-white/[0.07] hover:border-amber-300/30 hover:text-amber-100 transition-all duration-300"
                                >
                                    Back to top ↑
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <Footer />
        </>
    );
}