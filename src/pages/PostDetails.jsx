// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../config/axios";
// import Navbar from "../components/Navbar";

// const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
// const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

// export default function PostDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const getPost = async () => {
//             try {
//                 const res = await api.get(`/posts/getOnePost/${id}`);
//                 setPost(res.data.post);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getPost();
//     }, [id]);

//     const getReadTime = (content) => {
//         if (!content) return 1;
//         const words = content.trim().split(/\s+/).length;
//         return Math.max(1, Math.ceil(words / 200));
//     };

//     if (loading) {
//         return (
//             <div style={sans} className="min-h-screen bg-[#0e0c0a] flex items-center justify-center">
//                 <div className="flex flex-col items-center gap-4">
//                     <div className="w-9 h-9 rounded-full border border-white/10 border-t-amber-300/80 animate-spin" />
//                     <p className="text-white/30 text-[11px] tracking-[0.28em] uppercase">Fetching story</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!post) {
//         return (
//             <div style={sans} className="min-h-screen bg-[#0e0c0a] flex items-center justify-center px-4">
//                 <div className="flex flex-col items-center text-center">
//                     <div className="w-14 h-14 rounded-full bg-amber-300/[0.05] border border-amber-300/15 flex items-center justify-center mb-5">
//                         <span style={serif} className="text-amber-200/70 text-xl italic">Ø</span>
//                     </div>
//                     <p style={serif} className="text-white/60 text-lg italic">Story not found</p>
//                     <p className="text-white/25 text-[12px] mt-2 tracking-wide">It may have been removed or never existed</p>
//                     <button
//                         onClick={() => navigate(-1)}
//                         style={serif}
//                         className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-300/10 border border-amber-300/25 text-amber-100 text-[14px] italic hover:bg-amber-300/[0.15] transition-all duration-300"
//                     >
//                         ← Go back
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const authorObj = post.userId || post.user || {};
//     const authorName = authorObj.username || authorObj.name || authorObj.fullName || "Unknown Author";
//     const authorImage = authorObj.image || null;
//     const authorInitial = authorName.charAt(0).toUpperCase();
//     const dateStr = post.createdAt
//         ? new Date(post.createdAt).toLocaleDateString(undefined, {
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//         })
//         : "Recent";

//     return (
//         <>
//             <Navbar />
//             <div style={sans} className="min-h-screen bg-[#0e0c0a] relative overflow-hidden">
//                 {/* Ambient glows */}
//                 <div className="pointer-events-none absolute -top-52 -left-40 w-[560px] h-[560px] bg-amber-500/[0.05] rounded-full blur-[120px]" />
//                 <div className="pointer-events-none absolute -bottom-52 -right-40 w-[560px] h-[560px] bg-rose-500/[0.035] rounded-full blur-[120px]" />
//                 <div
//                     className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
//                     style={{
//                         backgroundImage:
//                             "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
//                     }}
//                 />

//                 {/* ===== Top bar ===== */}
//                 <div className="relative border-b border-white/[0.06]">
//                     <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
//                         <button
//                             onClick={() => navigate(-1)}
//                             className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-amber-200/80 tracking-wide transition-colors"
//                         >
//                             ← Back to articles
//                         </button>
//                         <span className="text-[10px] text-white/25 uppercase tracking-[0.28em]">
//                             {post.category || "Article"}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

//                     {/* ===== Title block ===== */}
//                     <div className="max-w-3xl">
//                         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
//                             <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
//                             {post.category || "Article"}
//                         </span>

//                         <h1
//                             style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 40" }}
//                             className="text-[2.1rem] sm:text-[3.1rem] leading-[1.12] font-light tracking-[-0.02em] text-[#f4ece0] mt-6"
//                         >
//                             {post.title || "Untitled Article"}
//                         </h1>
//                     </div>

//                     {/* ===== Image + summary side by side ===== */}
//                     <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch mt-11">

//                         {/* Image */}
//                         <div className="relative w-full h-64 sm:h-80 md:h-full md:min-h-[22rem] rounded-[20px] overflow-hidden bg-[#161210]">
//                             {post.image ? (
//                                 <img
//                                     src={post.image}
//                                     alt={post.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <div className="h-full flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06),transparent_70%)]">
//                                     <span style={serif} className="text-white/15 text-4xl italic">—</span>
//                                     <span className="text-[11px] text-white/25 tracking-wide">No cover image</span>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Summary + meta */}
//                         <div className="flex flex-col">
//                             {post.shortDescription && (
//                                 <div>
//                                     <span className="text-[10px] text-amber-200/60 uppercase tracking-[0.26em] font-medium">
//                                         Summary of the story
//                                     </span>
//                                     <p
//                                         style={serif}
//                                         className="text-[17px] sm:text-[18.5px] text-white/70 font-light leading-[1.65] mt-3"
//                                     >
//                                         {post.shortDescription}
//                                     </p>
//                                 </div>
//                             )}

//                             <div className="mt-auto pt-8">
//                                 <div className="flex items-center gap-3 pb-5 mb-5 border-b border-white/[0.08]">
//                                     {authorImage ? (
//                                         <img
//                                             src={authorImage}
//                                             alt={authorName}
//                                             className="w-10 h-10 flex-shrink-0 rounded-full object-cover border border-amber-300/25 ring-2 ring-amber-300/[0.06]"
//                                         />
//                                     ) : (
//                                         <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
//                                             <span style={serif} className="text-[14px] italic text-amber-100">
//                                                 {authorInitial}
//                                             </span>
//                                         </div>
//                                     )}
//                                     <div className="flex flex-col">
//                                         <span className="text-[13px] text-white/85 font-medium leading-tight">
//                                             {authorName}
//                                         </span>
//                                         <span className="text-[10.5px] text-white/35 font-light tracking-wide">Author</span>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-6 text-[12.5px] text-white/40 tracking-wide">
//                                     <span className="flex items-center gap-2">
//                                         <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                                             <rect x="3" y="4" width="18" height="18" rx="2" />
//                                             <path d="M16 2v4M8 2v4M3 10h18" />
//                                         </svg>
//                                         {dateStr}
//                                     </span>
//                                     <span className="flex items-center gap-2">
//                                         <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                                             <circle cx="12" cy="12" r="9" />
//                                             <path d="M12 7v5l3 3" />
//                                         </svg>
//                                         {getReadTime(post.content)} min read
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ===== Full story ===== */}
//                     <div className="mt-16 sm:mt-20 max-w-3xl">
//                         <span className="text-[10px] text-amber-200/60 uppercase tracking-[0.26em] font-medium">
//                             The full story
//                         </span>
//                         <div className="w-12 h-[2px] bg-amber-300/40 mt-4 mb-9" />

//                         <div
//                             style={{ ...serif, fontVariationSettings: "'SOFT' 20" }}
//                             className="text-white/65 text-[17px] sm:text-[18px] font-light leading-[1.95] whitespace-pre-line"
//                         >
//                             {post.content || "No content available."}
//                         </div>
//                     </div>

//                     {/* Author footer card */}
//                     <div className="flex items-center gap-4 mt-16 p-6 rounded-[18px] bg-[#141210] border border-white/[0.06] max-w-3xl">
//                         {authorImage ? (
//                             <img
//                                 src={authorImage}
//                                 alt={authorName}
//                                 className="w-14 h-14 flex-shrink-0 rounded-full object-cover border border-amber-300/25"
//                             />
//                         ) : (
//                             <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
//                                 <span style={serif} className="text-[19px] italic text-amber-100">
//                                     {authorInitial}
//                                 </span>
//                             </div>
//                         )}
//                         <div className="flex flex-col">
//                             <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-light">
//                                 Written by
//                             </span>
//                             <span style={serif} className="text-[16px] text-[#f4ece0] italic mt-0.5">
//                                 {authorName}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import Navbar from "../components/Navbar";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <Navbar />
            <div style={sans} className="min-h-screen bg-[#0e0c0a] relative overflow-hidden">
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

                {/* ===== Top bar ===== */}
                <div className="relative border-b border-white/[0.06]">
                    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-amber-200/80 tracking-wide transition-colors"
                        >
                            ← Back to articles
                        </button>
                        <span className="text-[10px] text-white/25 uppercase tracking-[0.28em]">
                            {post.category || "Article"}
                        </span>
                    </div>
                </div>

                <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

                    {/* ===== Title block ===== */}
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                            <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                            {post.category || "Article"}
                        </span>

                        <h1
                            style={{ ...serif, fontOpticalSizing: "auto", fontVariationSettings: "'SOFT' 40" }}
                            className="text-[2.1rem] sm:text-[3.1rem] leading-[1.12] font-light tracking-[-0.02em] text-[#f4ece0] mt-6"
                        >
                            {post.title || "Untitled Article"}
                        </h1>
                    </div>

                    {/* ===== Image + summary side by side ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch mt-11">

                        {/* Image */}
                        <div className="relative w-full h-64 sm:h-80 md:h-full md:min-h-[22rem] rounded-[20px] overflow-hidden bg-[#161210]">
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06),transparent_70%)]">
                                    <span style={serif} className="text-white/15 text-4xl italic">—</span>
                                    <span className="text-[11px] text-white/25 tracking-wide">No cover image</span>
                                </div>
                            )}
                        </div>

                        {/* Summary + meta */}
                        <div className="flex flex-col">
                            {post.shortDescription && (
                                <div>
                                    <span className="text-[10px] text-amber-200/60 uppercase tracking-[0.26em] font-medium">
                                        Summary of the story
                                    </span>
                                    <p
                                        style={serif}
                                        className="text-[17px] sm:text-[18.5px] text-white/70 font-light leading-[1.65] mt-3"
                                    >
                                        {post.shortDescription}
                                    </p>
                                </div>
                            )}

                            <div className="mt-auto pt-8">
                                <div className="flex items-center gap-3 pb-5 mb-5 border-b border-white/[0.08]">
                                    {authorImage ? (
                                        <img
                                            src={authorImage}
                                            alt={authorName}
                                            className="w-10 h-10 flex-shrink-0 rounded-full object-cover border border-amber-300/25 ring-2 ring-amber-300/[0.06]"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
                                            <span style={serif} className="text-[14px] italic text-amber-100">
                                                {authorInitial}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-white/85 font-medium leading-tight">
                                            {authorName}
                                        </span>
                                        <span className="text-[10.5px] text-white/35 font-light tracking-wide">Author</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-[12.5px] text-white/40 tracking-wide">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <path d="M16 2v4M8 2v4M3 10h18" />
                                        </svg>
                                        {dateStr}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 3" />
                                        </svg>
                                        {getReadTime(post.content)} min read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== Full story ===== */}
                    <div className="mt-16 sm:mt-20 max-w-3xl">
                        <span className="text-[10px] text-amber-200/60 uppercase tracking-[0.26em] font-medium">
                            The full story
                        </span>
                        <div className="w-12 h-[2px] bg-amber-300/40 mt-4 mb-9" />

                        <div
                            style={{ ...serif, fontVariationSettings: "'SOFT' 20" }}
                            className="text-white/65 text-[17px] sm:text-[18px] font-light leading-[1.95] whitespace-pre-line"
                        >
                            {post.content || "No content available."}
                        </div>
                    </div>

                    {/* Author footer card */}
                    <div className="flex items-center gap-4 mt-16 p-6 rounded-[18px] bg-[#141210] border border-white/[0.06] max-w-3xl">
                        {authorImage ? (
                            <img
                                src={authorImage}
                                alt={authorName}
                                className="w-14 h-14 flex-shrink-0 rounded-full object-cover border border-amber-300/25"
                            />
                        ) : (
                            <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300/25 to-amber-500/5 border border-amber-300/30 flex items-center justify-center">
                                <span style={serif} className="text-[19px] italic text-amber-100">
                                    {authorInitial}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-light">
                                Written by
                            </span>
                            <span style={serif} className="text-[16px] text-[#f4ece0] italic mt-0.5">
                                {authorName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}