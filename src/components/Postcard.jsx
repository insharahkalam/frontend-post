import React from "react";
import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
    Technology: "#1F6F54",
    Culture: "#E8A33D",
    Science: "#B23A2E",
    Business: "#14171F",
    Design: "#1F6F54",
    Environment: "#B23A2E",
};

export default function PostCard({ post, onDelete }) {
    const navigate = useNavigate();

    const author = post.userId || {};
    const authorName = author.username || "Unknown Author";
    const authorImage = author.image || null;
    const authorInitial = authorName.charAt(0).toUpperCase();

    const categoryColor = CATEGORY_COLORS[post.category] || "#1F6F54";

    return (
        <article className="card-lift group relative flex flex-col h-full bg-[#EAE4D4] border border-[#14171F]/10 rounded-2xl overflow-hidden">
            {/* Image */}
            <div className="img-zoom relative h-48 w-full bg-[#14171F]/5 overflow-hidden shrink-0">
                {post.image ? (
                    <img src={post.image} className="w-full h-full object-cover" alt={post.title || "post"} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <span className="text-[11px] text-[#14171F]/30 font-mono">No cover image</span>
                    </div>
                )}

                {post.category && (
                    <span
                        className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: categoryColor }}
                    >
                        {post.category}
                    </span>
                )}

                <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#14171F]/70 backdrop-blur-sm text-[10px] text-white font-mono">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    {post.views ?? 0}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h2 className="font-display text-xl leading-snug mb-2 text-[#14171F] group-hover:text-[#B23A2E] transition-colors line-clamp-2">
                    {post.title || "Untitled Article"}
                </h2>

                <p className="text-sm text-[#14171F]/60 mb-4 line-clamp-2 flex-1">
                    {post.shortDescription || post.content || "No summary available."}
                </p>

                {/* Meta row: rating + likes + read time */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#14171F]/45 mb-4">
                    {post.avgRating > 0 && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 fill-[#E8A33D]" viewBox="0 0 20 20"><path d="M10 1l2.6 6h6.4l-5.2 4 2 6.5L10 14l-5.8 3.5 2-6.5-5.2-4h6.4z" /></svg>
                            {post.avgRating.toFixed ? post.avgRating.toFixed(1) : post.avgRating} ({post.totalReviews || 0})
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        {post.likeCount || 0}
                    </span>
                    {post.estimatedReadTime && (
                        <span>{post.estimatedReadTime} min read</span>
                    )}
                </div>

                {/* Author + actions */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#14171F]/10">
                    <div className="flex items-center gap-2.5 min-w-0">
                        {authorImage ? (
                            <img src={authorImage} alt={authorName} className="w-8 h-8 rounded-full object-cover border border-[#14171F]/10" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#E8A33D]/20 border border-[#E8A33D]/40 flex items-center justify-center">
                                <span className="text-[11px] font-semibold text-[#B23A2E]">{authorInitial}</span>
                            </div>
                        )}
                        <div className="flex flex-col min-w-0">
                            <span className="text-[12.5px] text-[#14171F]/80 font-medium truncate leading-tight">{authorName}</span>
                            <span className="text-[10px] text-[#14171F]/35 font-mono uppercase tracking-[0.1em] mt-0.5">
                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Recent"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => navigate(`/post/${post._id}`)}
                            className="text-[11.5px] font-semibold text-[#B23A2E] hover:text-[#14171F] transition-colors focus-ring rounded"
                        >
                            Read →
                        </button>
                        {onDelete && (
                            <button
                                onClick={() => onDelete(post._id)}
                                aria-label="Delete"
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#14171F]/10 text-[#14171F]/40 hover:border-[#B23A2E]/40 hover:text-[#B23A2E] hover:bg-[#B23A2E]/5 transition-all"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}