import React, { useEffect, useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function PostContainer() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // -------- 1. Fetch Posts Logic --------
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get("/getAllPost");
                console.log(res, "get res check");
                setPosts(res.data.getPost);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const deletePosts = async (id) => {
        try {
            const res = await api.delete(`/delete/${id}`);
            console.log(res, "delete res check");
            toast.success("Post deleted successfully!");
            setPosts((prev) => prev.filter((post) => post._id !== id));
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete post");
        }
    };

    // -------- 2. Loading State --------
    if (loading) {
        return (
            <div className="min-h-screen bg-[#05080a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-white/[0.07] border-t-cyan-400 animate-spin" />
                    <p className="text-white/25 text-[12px] font-light tracking-widest uppercase">
                        Fetching articles…
                    </p>
                </div>
            </div>
        );
    }

    // -------- 3. Main UI --------
    return (
        <div className="min-h-screen bg-[#05080a] px-4 py-10">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#0f1e24",
                        color: "#e2eef1",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px",
                        fontSize: "13px",
                    },
                }}
            />

            <div className="max-w-5xl mx-auto">

                {/* ── Header ── */}
                <div className="mb-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/[0.08] border border-cyan-400/20 text-cyan-300 text-[10.5px] font-medium uppercase tracking-widest">
                        <span className="w-[5px] h-[5px] rounded-full bg-cyan-400 animate-pulse" />
                        Published
                    </span>

                    <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-[2rem] sm:text-[2.6rem] leading-[1.1] font-serif font-normal tracking-tight text-[#f0f4f5]">
                                All{" "}
                                <em className="italic text-cyan-400 font-serif">Articles</em>
                            </h1>
                            <p className="text-xs text-white/30 font-light mt-1">
                                A curated collection of published work
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-cyan-400 text-[#05080a] text-[13px] font-medium tracking-wide transition-all duration-150 hover:bg-cyan-300 hover:-translate-y-px active:translate-y-0"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#05080a"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            New Article
                        </button>
                    </div>

                    <div className="h-px bg-white/[0.06] mt-6" />
                </div>

                {/* ── Empty State ── */}
                {posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#0c1418] border border-dashed border-white/[0.07] rounded-[20px]">
                        <div className="w-12 h-12 rounded-[14px] bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                            <svg
                                className="w-5 h-5 stroke-white/20"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="3" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </div>
                        <p className="text-white/25 text-sm font-light">Nothing published yet</p>
                        <p className="text-white/15 text-[12px] mt-1">
                            Write your first article to get started
                        </p>
                    </div>
                )}

                {/* ── Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="group bg-[#0c1418] border border-white/[0.07] rounded-[20px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-cyan-400/20 hover:shadow-[0_0_50px_rgba(34,211,238,0.05)] transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {/* Image */}
                            <div className="h-44 bg-[#0a1115] overflow-hidden">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                                        alt="post"
                                    />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center gap-2 border-b border-white/[0.04]">
                                        <svg
                                            className="w-6 h-6 stroke-white/10"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="3" width="18" height="18" rx="3" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                        <span className="text-[11px] text-white/15 font-light">
                                            No cover image
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h2 className="text-[#e8f0f2] font-serif font-normal text-[1.05rem] leading-snug line-clamp-1 group-hover:text-cyan-300 transition-colors duration-200">
                                    {post.title || "Untitled Article"}
                                </h2>

                                <p className="text-white/30 text-[12.5px] font-light mt-2 leading-relaxed line-clamp-3">
                                    {post.content || "No summary available."}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-white/[0.06]">
                                    <span className="text-[10.5px] text-white/20 font-light">
                                        {post.createdAt
                                            ? new Date(post.createdAt).toLocaleDateString(undefined, {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                            : "Recently published"}
                                    </span>

                                    <button
                                        onClick={() => deletePosts(post._id)}
                                        className="inline-flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 rounded-[7px] border border-white/[0.07] text-white/30 hover:border-red-400/30 hover:text-red-300 hover:bg-red-400/[0.05] transition-all duration-150"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14H6L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4h6v2" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}