// // import React, { useEffect, useRef, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import api from "../config/axios";
// // import toast from "react-hot-toast";
// // import Navbar from "../components/Navbar";

// // // ---------- Star rating input ----------
// // function StarInput({ value, onChange }) {
// //     const [hover, setHover] = useState(0);
// //     return (
// //         <div className="flex items-center gap-1">
// //             {[1, 2, 3, 4, 5].map((n) => (
// //                 <button
// //                     key={n}
// //                     type="button"
// //                     onMouseEnter={() => setHover(n)}
// //                     onMouseLeave={() => setHover(0)}
// //                     onClick={() => onChange(n)}
// //                     className="focus-ring rounded"
// //                 >
// //                     <svg
// //                         className={`w-6 h-6 transition-colors ${(hover || value) >= n ? "fill-[#E8A33D] stroke-[#E8A33D]" : "fill-transparent stroke-[#14171F]/25"}`}
// //                         viewBox="0 0 20 20" strokeWidth="1.2"
// //                     >
// //                         <path d="M10 1l2.6 6h6.4l-5.2 4 2 6.5L10 14l-5.8 3.5 2-6.5-5.2-4h6.4z" />
// //                     </svg>
// //                 </button>
// //             ))}
// //         </div>
// //     );
// // }

// // export default function PostDetail() {
// //     const { id } = useParams();
// //     const navigate = useNavigate();

// //     const [post, setPost] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [liked, setLiked] = useState(false);
// //     const [likeCount, setLikeCount] = useState(0);

// //     const [comments, setComments] = useState([]);
// //     const [commentText, setCommentText] = useState("");

// //     const [reviews, setReviews] = useState([]);
// //     const [myRating, setMyRating] = useState(0);
// //     const [myReviewText, setMyReviewText] = useState("");

// //     const readStart = useRef(Date.now());
// //     const isLoggedIn = Boolean(localStorage.getItem("token"));
// //     const currentUserName = localStorage.getItem("userName");

// //     // -------- Fetch post (also increments view server-side) --------
// //     useEffect(() => {
// //         const fetchPost = async () => {
// //             try {
// //                 const res = await api.get(`/posts/getPost/${id}`);
// //                 setPost(res.data.post);
// //                 setLikeCount(res.data.post.likeCount || 0);
// //             } catch (err) {
// //                 toast.error("Could not load this article");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchPost();
// //     }, [id]);

// //     // -------- Fetch comments + reviews --------
// //     useEffect(() => {
// //         const fetchExtras = async () => {
// //             try {
// //                 const [commentsRes, reviewsRes] = await Promise.all([
// //                     api.get(`/comments/getByPost/${id}`),
// //                     api.get(`/reviews/getByPost/${id}`),
// //                 ]);
// //                 setComments(commentsRes.data.comments);
// //                 setReviews(reviewsRes.data.reviews);
// //             } catch (err) {
// //                 console.error("Error loading comments/reviews", err);
// //             }
// //         };
// //         fetchExtras();
// //     }, [id]);

// //     // -------- Read-time tracking: send duration when leaving the page --------
// //     useEffect(() => {
// //         readStart.current = Date.now();

// //         const sendReadTime = () => {
// //             const duration = Math.round((Date.now() - readStart.current) / 1000);
// //             if (duration < 2) return; // ignore accidental bounces
// //             navigator.sendBeacon &&
// //                 navigator.sendBeacon(
// //                     `${api.defaults.baseURL}/posts/trackRead/${id}`,
// //                     new Blob([JSON.stringify({ duration })], { type: "application/json" })
// //                 );
// //         };

// //         window.addEventListener("beforeunload", sendReadTime);
// //         return () => {
// //             sendReadTime();
// //             window.removeEventListener("beforeunload", sendReadTime);
// //         };
// //     }, [id]);

// //     // -------- Like toggle --------
// //     const handleLike = async () => {
// //         if (!isLoggedIn) {
// //             toast.error("Please login to like this article");
// //             return;
// //         }
// //         try {
// //             const res = await api.post(`/posts/like/${id}`);
// //             setLiked(res.data.liked);
// //             setLikeCount(res.data.likeCount);
// //         } catch (err) {
// //             toast.error("Something went wrong");
// //         }
// //     };

// //     // -------- Add comment --------
// //     const handleAddComment = async (e) => {
// //         e.preventDefault();
// //         if (!isLoggedIn) {
// //             toast.error("Please login to comment");
// //             return;
// //         }
// //         if (!commentText.trim()) return;

// //         try {
// //             const res = await api.post(`/comments/add/${id}`, { text: commentText });
// //             setComments((prev) => [res.data.comment, ...prev]);
// //             setCommentText("");
// //         } catch (err) {
// //             toast.error(err?.response?.data?.message || "Failed to add comment");
// //         }
// //     };

// //     const handleDeleteComment = async (commentId) => {
// //         try {
// //             await api.delete(`/comments/delete/${commentId}`);
// //             setComments((prev) => prev.filter((c) => c._id !== commentId));
// //         } catch (err) {
// //             toast.error("Failed to delete comment");
// //         }
// //     };

// //     // -------- Submit review --------
// //     const handleSubmitReview = async (e) => {
// //         e.preventDefault();
// //         if (!isLoggedIn) {
// //             toast.error("Please login to leave a review");
// //             return;
// //         }
// //         if (myRating < 1) {
// //             toast.error("Please select a rating");
// //             return;
// //         }

// //         try {
// //             const res = await api.post(`/reviews/add/${id}`, { rating: myRating, reviewText: myReviewText });
// //             setReviews((prev) => {
// //                 const existingIndex = prev.findIndex((r) => r._id === res.data.review._id);
// //                 if (existingIndex >= 0) {
// //                     const copy = [...prev];
// //                     copy[existingIndex] = res.data.review;
// //                     return copy;
// //                 }
// //                 return [res.data.review, ...prev];
// //             });
// //             toast.success("Review saved!");
// //         } catch (err) {
// //             toast.error(err?.response?.data?.message || "Failed to save review");
// //         }
// //     };

// //     if (loading) {
// //         return (
// //             <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center">
// //                 <div className="w-10 h-10 rounded-full border-2 border-[#14171F]/10 border-t-[#E8A33D] spinner" />
// //             </div>
// //         );
// //     }

// //     if (!post) {
// //         return (
// //             <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center">
// //                 <p className="text-[#14171F]/50 font-mono">Article not found.</p>
// //             </div>
// //         );
// //     }

// //     const author = post.userId || {};

// //     return (
// //         <>
// //             <Navbar />
// //             <div className="min-h-screen bg-[#F3EFE4] px-4 py-10">
// //                 <div className="max-w-3xl mx-auto">
// //                     <button
// //                         onClick={() => navigate(-1)}
// //                         className="text-[12px] font-mono uppercase tracking-[0.1em] text-[#14171F]/45 hover:text-[#14171F] mb-6 inline-flex items-center gap-1.5"
// //                     >
// //                         ← Back
// //                     </button>

// //                     {/* Category + meta */}
// //                     <div className="flex items-center gap-3 mb-4 flex-wrap">
// //                         {post.category && (
// //                             <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#B23A2E] border border-[#B23A2E]/30 rounded-full px-2.5 py-1">
// //                                 {post.category}
// //                             </span>
// //                         )}
// //                         <span className="text-[11px] font-mono text-[#14171F]/40">{post.estimatedReadTime} min read</span>
// //                         <span className="text-[11px] font-mono text-[#14171F]/40">{post.views} views</span>
// //                     </div>

// //                     <h1 className="font-display font-medium text-3xl sm:text-4xl leading-tight text-[#14171F] mb-4">
// //                         {post.title}
// //                     </h1>

// //                     {/* Author */}
// //                     <div className="flex items-center gap-3 mb-6">
// //                         {author.image ? (
// //                             <img src={author.image} className="w-10 h-10 rounded-full object-cover" alt={author.username} />
// //                         ) : (
// //                             <div className="w-10 h-10 rounded-full bg-[#E8A33D]/20 flex items-center justify-center text-sm font-semibold text-[#B23A2E]">
// //                                 {(author.username || "?").charAt(0).toUpperCase()}
// //                             </div>
// //                         )}
// //                         <div>
// //                             <p className="text-sm font-semibold text-[#14171F]">{author.username || "Unknown"}</p>
// //                             <p className="text-xs text-[#14171F]/40">
// //                                 {post.createdAt && new Date(post.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
// //                             </p>
// //                         </div>
// //                     </div>

// //                     {post.image && (
// //                         <img src={post.image} alt={post.title} className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl mb-8" />
// //                     )}

// //                     <p className="text-[#14171F]/80 text-lg leading-relaxed whitespace-pre-line mb-8">{post.content}</p>

// //                     {/* Like + rating summary */}
// //                     <div className="flex items-center gap-4 py-6 border-t border-b border-[#14171F]/10 mb-10">
// //                         <button
// //                             onClick={handleLike}
// //                             className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked ? "bg-[#B23A2E] border-[#B23A2E] text-white" : "border-[#14171F]/15 text-[#14171F]/60 hover:border-[#B23A2E]/40 hover:text-[#B23A2E]"}`}
// //                         >
// //                             <svg className="w-4 h-4" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
// //                                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
// //                             </svg>
// //                             {likeCount} {likeCount === 1 ? "Like" : "Likes"}
// //                         </button>

// //                         {post.avgRating > 0 && (
// //                             <span className="inline-flex items-center gap-1.5 text-sm text-[#14171F]/60 font-mono">
// //                                 <svg className="w-4 h-4 fill-[#E8A33D]" viewBox="0 0 20 20"><path d="M10 1l2.6 6h6.4l-5.2 4 2 6.5L10 14l-5.8 3.5 2-6.5-5.2-4h6.4z" /></svg>
// //                                 {post.avgRating.toFixed(1)} · {post.totalReviews} reviews
// //                             </span>
// //                         )}
// //                     </div>

// //                     {/* ---------- Reviews ---------- */}
// //                     <section className="mb-12">
// //                         <h2 className="font-display text-2xl text-[#14171F] mb-4">Reviews</h2>

// //                         <form onSubmit={handleSubmitReview} className="bg-[#EAE4D4] border border-[#14171F]/10 rounded-2xl p-5 mb-6">
// //                             <p className="text-xs font-mono uppercase tracking-[0.1em] text-[#14171F]/45 mb-2">Your rating</p>
// //                             <StarInput value={myRating} onChange={setMyRating} />
// //                             <textarea
// //                                 value={myReviewText}
// //                                 onChange={(e) => setMyReviewText(e.target.value)}
// //                                 placeholder="Share your thoughts (optional)..."
// //                                 rows={2}
// //                                 className="w-full mt-3 px-3.5 py-2.5 rounded-[10px] bg-white border border-[#14171F]/10 text-sm text-[#14171F] placeholder:text-[#14171F]/25 outline-none focus:border-[#E8A33D] resize-none"
// //                             />
// //                             <button
// //                                 type="submit"
// //                                 className="mt-3 px-5 py-2 rounded-full bg-[#14171F] text-[#F3EFE4] text-[13px] font-semibold hover:bg-[#1E2330] transition-colors"
// //                             >
// //                                 Submit review
// //                             </button>
// //                         </form>

// //                         <div className="space-y-4">
// //                             {reviews.length === 0 && <p className="text-sm text-[#14171F]/40">No reviews yet — be the first.</p>}
// //                             {reviews.map((r) => (
// //                                 <div key={r._id} className="flex gap-3">
// //                                     <div className="w-8 h-8 rounded-full bg-[#E8A33D]/20 flex items-center justify-center text-xs font-semibold text-[#B23A2E] shrink-0">
// //                                         {(r.userId?.username || "?").charAt(0).toUpperCase()}
// //                                     </div>
// //                                     <div>
// //                                         <div className="flex items-center gap-2">
// //                                             <p className="text-sm font-semibold text-[#14171F]">{r.userId?.username}</p>
// //                                             <span className="flex items-center">
// //                                                 {[1, 2, 3, 4, 5].map((n) => (
// //                                                     <svg key={n} className={`w-3 h-3 ${n <= r.rating ? "fill-[#E8A33D]" : "fill-[#14171F]/15"}`} viewBox="0 0 20 20">
// //                                                         <path d="M10 1l2.6 6h6.4l-5.2 4 2 6.5L10 14l-5.8 3.5 2-6.5-5.2-4h6.4z" />
// //                                                     </svg>
// //                                                 ))}
// //                                             </span>
// //                                         </div>
// //                                         {r.reviewText && <p className="text-sm text-[#14171F]/60 mt-1">{r.reviewText}</p>}
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </section>

// //                     {/* ---------- Comments ---------- */}
// //                     <section>
// //                         <h2 className="font-display text-2xl text-[#14171F] mb-4">
// //                             Comments <span className="text-[#14171F]/40 text-lg">({comments.length})</span>
// //                         </h2>

// //                         <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
// //                             <input
// //                                 type="text"
// //                                 value={commentText}
// //                                 onChange={(e) => setCommentText(e.target.value)}
// //                                 placeholder="Add a comment..."
// //                                 className="flex-1 px-4 py-2.5 rounded-full bg-white border border-[#14171F]/10 text-sm text-[#14171F] placeholder:text-[#14171F]/25 outline-none focus:border-[#E8A33D]"
// //                             />
// //                             <button
// //                                 type="submit"
// //                                 className="px-5 py-2.5 rounded-full bg-[#E8A33D] text-[#14171F] text-[13px] font-semibold hover:bg-[#14171F] hover:text-[#F3EFE4] transition-colors"
// //                             >
// //                                 Post
// //                             </button>
// //                         </form>

// //                         <div className="space-y-5">
// //                             {comments.length === 0 && <p className="text-sm text-[#14171F]/40">No comments yet.</p>}
// //                             {comments.map((c) => (
// //                                 <div key={c._id} className="flex gap-3">
// //                                     <div className="w-8 h-8 rounded-full bg-[#1F6F54]/15 flex items-center justify-center text-xs font-semibold text-[#1F6F54] shrink-0">
// //                                         {(c.userId?.username || "?").charAt(0).toUpperCase()}
// //                                     </div>
// //                                     <div className="flex-1">
// //                                         <div className="flex items-center justify-between">
// //                                             <p className="text-sm font-semibold text-[#14171F]">{c.userId?.username}</p>
// //                                             {c.userId?.username === currentUserName && (
// //                                                 <button
// //                                                     onClick={() => handleDeleteComment(c._id)}
// //                                                     className="text-[11px] text-[#14171F]/30 hover:text-[#B23A2E]"
// //                                                 >
// //                                                     Delete
// //                                                 </button>
// //                                             )}
// //                                         </div>
// //                                         <p className="text-sm text-[#14171F]/65 mt-0.5">{c.text}</p>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </section>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import api from "../config/axios";
// import Navbar from "../components/Navbar";

// const CATEGORY_COLORS = {
//     Technology: "#1F6F54",
//     Culture: "#E8A33D",
//     Science: "#B23A2E",
//     Business: "#14171F",
//     Design: "#1F6F54",
//     Environment: "#B23A2E",
// };

// export default function PostDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [liked, setLiked] = useState(false);
//     const [likeCount, setLikeCount] = useState(0);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 setLoading(true);
//                 // NOTE: adjust this path if your single-post route differs
//                 const res = await api.get(`/posts/${id}`);
//                 const fetched = res.data.post;
//                 setPost(fetched);
//                 setLikeCount(fetched.likeCount || 0);

//                 const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")?._id;
//                 if (currentUserId && fetched.likes?.some((uid) => uid === currentUserId)) {
//                     setLiked(true);
//                 }
//             } catch (err) {
//                 console.error("Error fetching post:", err);
//                 toast.error("Could not load this article");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPost();
//     }, [id]);

//     const handleLikeToggle = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             toast.error("Please login first to like posts");
//             return;
//         }
//         // optimistic update
//         setLiked((prev) => !prev);
//         setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

//         try {
//             // NOTE: adjust this path if your like-toggle route differs
//             const res = await api.patch(`/posts/${id}/like`);
//             setLiked(res.data.liked);
//             setLikeCount(res.data.likeCount);
//         } catch (err) {
//             // revert on failure
//             setLiked((prev) => !prev);
//             setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
//             toast.error(err?.response?.data?.message || "Failed to update like");
//         }
//     };

//     if (loading) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center">
//                     <div className="flex flex-col items-center gap-4">
//                         <div className="w-10 h-10 rounded-full border-2 border-[#14171F]/10 border-t-[#E8A33D] spinner" />
//                         <p className="text-[#14171F]/40 text-[12px] font-mono tracking-widest uppercase">Loading article…</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     if (!post) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center px-4">
//                     <div className="text-center">
//                         <p className="text-[#14171F]/50 text-sm font-light mb-4">This article couldn't be found.</p>
//                         <button
//                             onClick={() => navigate("/")}
//                             className="text-[13px] font-semibold text-[#B23A2E] hover:text-[#14171F] transition-colors"
//                         >
//                             ← Back to all articles
//                         </button>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const author = post.userId || {};
//     const authorName = author.username || "Unknown Author";
//     const authorImage = author.image || null;
//     const authorInitial = authorName.charAt(0).toUpperCase();
//     const categoryColor = CATEGORY_COLORS[post.category] || "#1F6F54";

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-[#F3EFE4] px-4 py-10">
//                 <div className="max-w-[720px] mx-auto">
//                     {/* Back link */}
//                     <Link
//                         to="/"
//                         className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#14171F]/40 hover:text-[#B23A2E] transition-colors mb-6"
//                     >
//                         ← All articles
//                     </Link>

//                     {/* Category + meta eyebrow */}
//                     <div className="flex items-center gap-3 mb-4">
//                         <span
//                             className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-white px-2.5 py-1 rounded-full"
//                             style={{ backgroundColor: categoryColor }}
//                         >
//                             {post.category}
//                         </span>
//                         {post.estimatedReadTime && (
//                             <span className="text-[11px] font-mono text-[#14171F]/40 uppercase tracking-widest">
//                                 {post.estimatedReadTime} min read
//                             </span>
//                         )}
//                     </div>

//                     {/* Title */}
//                     <h1 className="text-[2.3rem] sm:text-[2.8rem] leading-[1.1] font-display font-medium tracking-tight text-[#14171F] mb-4">
//                         {post.title}
//                     </h1>

//                     {/* Short description / lede */}
//                     {post.shortDescription && (
//                         <p className="text-[17px] leading-relaxed text-[#14171F]/55 font-light mb-6">
//                             {post.shortDescription}
//                         </p>
//                     )}

//                     {/* Author row */}
//                     <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[#14171F]/10">
//                         <div className="flex items-center gap-3">
//                             {authorImage ? (
//                                 <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-[#14171F]/10" />
//                             ) : (
//                                 <div className="w-10 h-10 rounded-full bg-[#E8A33D]/20 border border-[#E8A33D]/40 flex items-center justify-center">
//                                     <span className="text-[13px] font-semibold text-[#B23A2E]">{authorInitial}</span>
//                                 </div>
//                             )}
//                             <div className="flex flex-col">
//                                 <span className="text-[13.5px] text-[#14171F]/85 font-medium leading-tight">{authorName}</span>
//                                 <span className="text-[10.5px] text-[#14171F]/35 font-mono uppercase tracking-[0.1em] mt-0.5">
//                                     {post.createdAt
//                                         ? new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
//                                         : "Recent"}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4 text-[#14171F]/45 font-mono text-[11px] shrink-0">
//                             <span className="flex items-center gap-1">
//                                 <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                     <path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" />
//                                     <circle cx="12" cy="12" r="3" />
//                                 </svg>
//                                 {post.views ?? 0}
//                             </span>

//                             <button
//                                 onClick={handleLikeToggle}
//                                 className={`flex items-center gap-1 transition-colors ${liked ? "text-[#B23A2E]" : "hover:text-[#B23A2E]"}`}
//                             >
//                                 <svg
//                                     className="w-3.5 h-3.5"
//                                     viewBox="0 0 24 24"
//                                     fill={liked ? "#B23A2E" : "none"}
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                 >
//                                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
//                                 </svg>
//                                 {likeCount}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Cover image */}
//                     {post.image && (
//                         <div className="w-full rounded-2xl overflow-hidden mb-8 border border-[#14171F]/10">
//                             <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
//                         </div>
//                     )}

//                     {/* Content */}
//                     <div className="text-[16px] leading-[1.8] text-[#14171F]/85 font-light whitespace-pre-wrap mb-12">
//                         {post.content}
//                     </div>

//                     <div className="h-px bg-[#14171F]/10 mb-6" />

//                     <div className="flex justify-between items-center pb-10">
//                         <Link
//                             to="/"
//                             className="text-[13px] font-semibold text-[#B23A2E] hover:text-[#14171F] transition-colors"
//                         >
//                             ← Back to all articles
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/axios";
import Navbar from "../components/Navbar";

const CATEGORY_COLORS = {
    Technology: "#1F6F54",
    Culture: "#E8A33D",
    Science: "#B23A2E",
    Business: "#14171F",
    Design: "#1F6F54",
    Environment: "#B23A2E",
};

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                // NOTE: adjust this path if your single-post route differs
                const res = await api.get(`/posts/getPost/${id}`);
                console.log(res, 'check res');

                const fetched = res.data.post;
                setPost(fetched);
                setLikeCount(fetched.likeCount || 0);

                const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")?._id;
                if (currentUserId && fetched.likes?.some((uid) => uid === currentUserId)) {
                    setLiked(true);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                toast.error("Could not load this article");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleLikeToggle = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first to like posts");
            return;
        }
        // optimistic update
        setLiked((prev) => !prev);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

        try {
            // NOTE: adjust this path if your like-toggle route differs
            const res = await api.patch(`/posts/${id}/like`);
            setLiked(res.data.liked);
            setLikeCount(res.data.likeCount);
        } catch (err) {
            // revert on failure
            setLiked((prev) => !prev);
            setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
            toast.error(err?.response?.data?.message || "Failed to update like");
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-[#14171F]/10 border-t-[#E8A33D] spinner" />
                        <p className="text-[#14171F]/40 text-[12px] font-mono tracking-widest uppercase">Loading article…</p>
                    </div>
                </div>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center px-4">
                    <div className="text-center">
                        <p className="text-[#14171F]/50 text-sm font-light mb-4">This article couldn't be found.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-[13px] font-semibold text-[#B23A2E] hover:text-[#14171F] transition-colors"
                        >
                            ← Back to all articles
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const author = post.userId || {};
    const authorName = author.username || "Unknown Author";
    const authorImage = author.image || null;
    const authorInitial = authorName.charAt(0).toUpperCase();
    const categoryColor = CATEGORY_COLORS[post.category] || "#1F6F54";

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F3EFE4] px-4 py-10">
                <div className="max-w-[640px] mx-auto">
                    {/* Back link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#14171F]/40 hover:text-[#B23A2E] transition-colors mb-5"
                    >
                        ← All articles
                    </Link>

                    {/* Card — same structure as PostCard, just expanded */}
                    <article className="relative flex flex-col bg-[#EAE4D4] border border-[#14171F]/10 rounded-2xl overflow-hidden">
                        {/* Image */}
                        <div className="relative h-72 w-full bg-[#14171F]/5 overflow-hidden shrink-0">
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
                        <div className="flex flex-col p-5">
                            <h2 className="font-display text-2xl leading-snug mb-2 text-[#14171F]">
                                {post.title || "Untitled Article"}
                            </h2>

                            <p className="text-sm text-[#14171F]/60 mb-4">
                                {post.shortDescription}
                            </p>

                            {/* Meta row: rating + likes + read time */}
                            <div className="flex items-center gap-3 text-[11px] font-mono text-[#14171F]/45 mb-4">
                                {post.avgRating > 0 && (
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3 h-3 fill-[#E8A33D]" viewBox="0 0 20 20"><path d="M10 1l2.6 6h6.4l-5.2 4 2 6.5L10 14l-5.8 3.5 2-6.5-5.2-4h6.4z" /></svg>
                                        {post.avgRating.toFixed ? post.avgRating.toFixed(1) : post.avgRating} ({post.totalReviews || 0})
                                    </span>
                                )}
                                <button
                                    onClick={handleLikeToggle}
                                    className={`flex items-center gap-1 transition-colors ${liked ? "text-[#B23A2E]" : "hover:text-[#B23A2E]"}`}
                                >
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill={liked ? "#B23A2E" : "none"} stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    {likeCount}
                                </button>
                                {post.estimatedReadTime && (
                                    <span>{post.estimatedReadTime} min read</span>
                                )}
                            </div>

                            {/* Author row — same as PostCard */}
                            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#14171F]/10 mb-6">
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
                            </div>

                            {/* Full content */}
                            <div className="text-sm leading-[1.8] text-[#14171F]/80 font-light whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}