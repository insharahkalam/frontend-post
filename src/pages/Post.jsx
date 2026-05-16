import React, { useEffect, useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PostContainer() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // -------- 1. Fetch Posts Logic --------
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Apne actual GET API endpoint se replace karein (e.g., "/posts" ya "/get-posts")
                const res = await api.get("/getAllPost");
                console.log(res, "get res check");

                // Agar aapka data res.data.posts mein aa raha ho to wese set karein
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

            // 🔥 UI update without refresh
            setPosts((prev) => prev.filter((post) => post._id !== id));

        } catch (err) {
            console.log(err);
            toast.error("Failed to delete post");
        }
    };



    // -------- 2. Loading State UI --------
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b1020] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                    <p className="text-gray-400 text-sm font-medium">Loading amazing posts...</p>
                </div>
            </div>
        );
    }

    // -------- 3. Main UI Layout --------
    return (
        <div className="min-h-screen bg-[#0b1020] px-4 py-12">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-12 text-center relative">

                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                        Latest Community Posts
                    </h1>

                    <p className="text-gray-400 text-sm">
                        Explore stories, thoughts, and ideas shared by everyone
                    </p>


                </div>

                {/* back */}
                <div className="flex justify-end mb-10">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-4 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:opacity-90 transition"
                    >
                        Back to Create Post
                    </button>
                </div>

                {/* Empty State (Agar koi post na mile) */}
                {posts.length === 0 && (
                    <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl max-w-md mx-auto">
                        <p className="text-gray-400 font-medium">No posts available right now.</p>
                    </div>
                )}

                {/* Responsive Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {posts.map((post) => (
                        <div
                            key={post._id || post.id}
                            className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md"
                        >

                            {/* Image Section */}
                            <div className="relative h-48 w-full overflow-hidden bg-white/5">
                                {post?.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title || "Post"}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    // Image Fallback Icon if image is missing
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <svg
                                            className="w-12 h-12"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
                                {/* Title */}
                                <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                                    {post?.title || "Untitled Post"}
                                </h2>

                                {/* Content text */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {post?.content || "No description provided for this post."}
                                </p>

                                {/* Card Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                    <span className="text-xs text-gray-500">
                                        {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}
                                    </span>

                                    <button onClick={() => deletePosts(post._id)} className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors group/btn">
                                        Delete Post
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