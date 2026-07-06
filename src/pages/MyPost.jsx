import React, { useEffect, useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import Footer from "../components/Footer";
const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

export default function MyPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // -------- Auth Guard --------
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first to access this page.");
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async (id) => {
            console.log(id, "chexk id===>");

            try {
                const res = await api.get(`/posts/getMyPost/${id}`);
                setPosts(res.data.myPost);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const deletePosts = async (id) => {
        const result = await Swal.fire({
            title: "Delete this article?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            background: "#0e0c0a",
            color: "#f4ece0",
            confirmButtonColor: "#fbbf24",
            cancelButtonColor: "transparent",
            customClass: {
                popup: "swal-journal-popup",
                title: "swal-journal-title",
                htmlContainer: "swal-journal-text",
                confirmButton: "swal-journal-confirm",
                cancelButton: "swal-journal-cancel",
                icon: "swal-journal-icon",
            },
        });
        if (!result.isConfirmed) return;

        try {
            await api.delete(`/posts/delete/${id}`);
            toast.success("Post deleted successfully!");
            setPosts((prev) => prev.filter((post) => post._id !== id));
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete post");
        }
    };

    if (loading) {
        return (
            <div style={sans} className="min-h-screen bg-[#0e0c0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-9 h-9 rounded-full border border-white/10 border-t-amber-300/80 animate-spin" />
                    <p className="text-white/30 text-[11px] tracking-[0.28em] uppercase">Fetching Articles</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <style>{`
                .swal-journal-popup {
                    border-radius: 20px !important;
                    border: 1px solid rgba(251, 191, 36, 0.15) !important;
                    box-shadow: 0 20px 60px -10px rgba(0,0,0,0.6) !important;
                    font-family: 'Inter Tight', ui-sans-serif, system-ui, sans-serif !important;
                }
                .swal-journal-title {
                    font-family: 'Fraunces', ui-serif, Georgia, serif !important;
                    font-weight: 400 !important;
                    font-style: italic !important;
                    color: #f4ece0 !important;
                }
                .swal-journal-text {
                    color: rgba(255,255,255,0.45) !important;
                    font-weight: 300 !important;
                    font-size: 13.5px !important;
                }
                .swal-journal-icon {
                    border-color: rgba(251, 191, 36, 0.3) !important;
                    color: #fbbf24 !important;
                }
                .swal-journal-confirm {
                    border-radius: 999px !important;
                    padding: 10px 22px !important;
                    font-size: 13px !important;
                    font-weight: 500 !important;
                    letter-spacing: 0.02em !important;
                    box-shadow: none !important;
                    color: #0e0c0a !important;
                }
                .swal-journal-cancel {
                    border-radius: 999px !important;
                    padding: 10px 22px !important;
                    font-size: 13px !important;
                    font-weight: 500 !important;
                    border: 1px solid rgba(255,255,255,0.15) !important;
                    color: rgba(255,255,255,0.6) !important;
                    box-shadow: none !important;
                }
            `}</style>

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

                <div className="max-w-7xl mx-auto relative">
                    {/* Header */}
                    <div className="mb-14">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                            <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                            Your Desk
                        </span>

                        <div className="mt-5 flex items-end justify-between gap-6 flex-wrap">
                            <div>
                                <h1
                                    style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 50, 'WONK' 0" }}
                                    className="text-[2.4rem] sm:text-[3rem] leading-[1.02] font-medium tracking-[-0.02em] text-[#f4ece0]"
                                >
                                    Collections of {" "}
                                    <em
                                        style={{ ...serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
                                        className="italic font-normal text-amber-200/90"
                                    >
                                        Articles
                                    </em>
                                </h1>
                                <p className="text-[14px] text-white/45 font-light mt-3 leading-relaxed">
                                    Every story you've put into words, gathered in one place.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/create")}
                                style={serif}
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-300/10 border border-amber-300/25 text-amber-100 text-[14px] italic hover:bg-amber-300/[0.15] hover:border-amber-300/40 transition-all duration-300"
                            >
                                <FaPlus className="text-[11px] not-italic" />
                                New story
                            </button>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-amber-200/[0.12] to-transparent mt-10" />
                    </div>

                    {/* Empty State */}
                    {posts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/[0.08] rounded-[22px]">
                            <div className="w-14 h-14 rounded-full bg-amber-300/[0.05] border border-amber-300/15 flex items-center justify-center mb-5">
                                <span style={serif} className="text-amber-200/70 text-xl italic">Ø</span>
                            </div>
                            <p style={serif} className="text-white/60 text-lg italic">Nothing published yet</p>
                            <p className="text-white/25 text-[12px] mt-2 tracking-wide">Write your first article to get started</p>
                        </div>
                    )}

                    {/* Cards Grid - 4 per row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {posts.map((post) => {
                            const dateStr = post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "Recent";

                            return (
                                <article
                                    key={post._id}
                                    className="group relative flex flex-col h-full bg-[#141210] border border-white/[0.06] rounded-[20px] p-2.5 hover:border-amber-300/25 hover:-translate-y-1 hover:shadow-[0_16px_50px_-14px_rgba(251,191,36,0.18)] transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative h-55 w-full bg-[#1b1613] overflow-hidden shrink-0 rounded-[14px]">
                                        {post.image ? (
                                            <>
                                                <img
                                                    src={post.image}
                                                    className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-[900ms] ease-out"
                                                    alt={post.title || "post"}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                                            </>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center gap-1 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.07),transparent_70%)]">
                                                <span style={serif} className="text-white/15 text-2xl italic">—</span>
                                                <span className="text-[10px] text-white/25 tracking-wide">No cover</span>
                                            </div>
                                        )}

                                        <div className="absolute top-2 left-2 inline-flex items-center px-2 py-[3px] rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[9px] text-amber-100/90 font-medium uppercase tracking-[0.16em]">
                                            {post.category || "Article"}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex flex-col flex-1 px-2 pt-4 pb-2">
                                        <h2
                                            style={{ ...serif, fontVariationSettings: "'SOFT' 40" }}
                                            className="text-[#f4ece0] font-light text-[1.05rem] leading-[1.3] tracking-[-0.005em] line-clamp-2 group-hover:text-amber-100 transition-colors duration-300"
                                        >
                                            {post.title || "Untitled Article"}
                                        </h2>

                                        <p className="text-white/40 text-[12px] font-light mt-2 leading-relaxed line-clamp-2">
                                            {post.content || "No summary available."}
                                        </p>

                                        <span className="text-[10px] text-white/30 uppercase tracking-[0.16em] font-light mt-2.5">
                                            {dateStr}
                                        </span>

                                        {/* Footer action */}
                                        <div className="mt-4 pt-3 border-t border-white/[0.06]">
                                            <button
                                                onClick={() => deletePosts(post._id)}
                                                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] border border-white/[0.08] text-white/40 text-[12px] font-light tracking-wide hover:border-red-400/40 hover:text-red-300 hover:bg-red-400/[0.07] transition-all duration-200"
                                            >
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6l-1 14H6L5 6" />
                                                    <path d="M10 11v6M14 11v6" />
                                                    <path d="M9 6V4h6v2" />
                                                </svg>
                                                Delete this article
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}