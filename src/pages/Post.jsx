import React, { useEffect, useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { FaPlus } from "react-icons/fa6";

export default function PostContainer() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get("/posts/getAllPost");
                setPosts(res.data.getPost);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

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

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#05080a] px-4 py-10 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-400/[0.04] rounded-full blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-400/[0.03] rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto relative">
                    {/* Header */}
                    <div className="mb-12">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/[0.08] border border-cyan-400/20 text-cyan-300 text-[10.5px] font-medium uppercase tracking-widest">
                            <span className="w-[5px] h-[5px] rounded-full bg-cyan-400 animate-pulse" />
                            Published
                        </span>

                        <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <h1 className="text-[2rem] sm:text-[2.6rem] leading-[1.1] font-serif font-normal tracking-tight text-[#f0f4f5]">
                                    All <em className="italic text-cyan-400 font-serif">Articles</em>
                                </h1>
                                <p className="text-xs text-white/30 font-light mt-1">
                                    A curated collection of published work
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/create")}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-cyan-400 text-[#05080a] text-[13px] font-bold font-serif tracking-wide transition-all duration-150 hover:bg-cyan-300 hover:-translate-y-px active:translate-y-0 shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)]"
                            >
                                <FaPlus />
                                New Article
                            </button>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mt-6" />
                    </div>

                    {/* Empty State */}
                    {posts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 bg-[#0c1418] border border-dashed border-white/[0.07] rounded-[20px]">
                            <div className="w-12 h-12 rounded-[14px] bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 stroke-white/20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                            </div>
                            <p className="text-white/25 text-sm font-light">Nothing published yet</p>
                            <p className="text-white/15 text-[12px] mt-1">Write your first article to get started</p>
                        </div>
                    )}

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {posts.map((post) => {
                            console.log(post, 'check post');

                            const authorObj = post.userId || post.user || {};
                            console.log(authorObj);

                            const authorName = authorObj.name || authorObj.username || authorObj.fullName || "Unknown Author";
                            console.log(authorName);

                            const authorImage =
                                authorObj.image || null;
                            console.log(authorImage);

                            const authorInitial = authorName.charAt(0).toUpperCase();
                            console.log(authorInitial);

                            return (
                                <article
                                    key={post._id}
                                    className="group relative flex flex-col h-full bg-gradient-to-b from-[#0d1519] to-[#080e11] border border-white/[0.06] rounded-[22px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:border-cyan-400/30 hover:shadow-[0_10px_60px_-10px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-1"
                                >
                                    {/* Gradient glow on hover */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/[0.04] via-transparent to-transparent" />

                                    {/* Image */}
                                    <div className="relative h-56 w-full bg-[#0a1115] overflow-hidden shrink-0">
                                        {post.image ? (
                                            <>
                                                <img
                                                    src={post.image}
                                                    className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-700 ease-out"
                                                    alt={post.title || "post"}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1519] via-[#0d1519]/20 to-transparent" />
                                            </>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04),transparent_70%)]">
                                                <svg className="w-7 h-7 stroke-white/15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path d="M21 15l-5-5L5 21" />
                                                </svg>
                                                <span className="text-[11px] text-white/20 font-light">No cover image</span>
                                            </div>
                                        )}

                                        {/* Date chip overlay */}
                                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.08] text-[10px] text-white/70 font-light tracking-wide">
                                            <span className="w-[5px] h-[5px] rounded-full bg-cyan-400" />
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : "Recent"}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex flex-col flex-1 p-5">
                                        <h2 className="text-[#e8f0f2] font-serif font-normal text-[1.15rem] leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                                            {post.title || "Untitled Article"}
                                        </h2>

                                        <p className="text-white/35 text-[12.5px] font-light mt-2.5 leading-relaxed line-clamp-3 flex-1">
                                            {post.content || "No summary available."}
                                        </p>

                                        {/* Author row */}
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                                            {authorImage ? (
                                                <img
                                                    src={authorImage}
                                                    alt={authorName}
                                                    className="w-6 h-6 flex-shrink-0 rounded-full object-cover border border-white/10"
                                                />
                                            ) : (
                                                <div className="w-6 h-6 flex-shrink-0 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                                                    <span className="text-[10px] font-medium text-cyan-300">
                                                        {authorInitial}
                                                    </span>
                                                </div>
                                            )}
                                            <span className="text-[12px] text-white/45 font-light truncate">
                                                {authorName}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}