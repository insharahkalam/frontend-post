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
        <div className="relative min-h-screen bg-[#071013] px-4 py-8 overflow-hidden">

            {/* Glow Background */}
            <div className="absolute top-[-120px] left-[-120px] w-[340px] h-[340px] bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-[340px] h-[340px] bg-emerald-400/10 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
                        Community Feed
                    </h1>
                    <p className="text-cyan-100/60 mt-2 text-sm">
                        Explore stories shared by people ✨
                    </p>
                </div>

                {/* Button */}
                <div className="flex justify-end mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium shadow-md shadow-cyan-500/20 hover:scale-105 transition"
                    >
                        Create Post
                    </button>
                </div>

                {/* Empty State */}
                {posts.length === 0 && (
                    <div className="text-center py-14 bg-[#0B1B21]/80 border border-cyan-900/40 rounded-2xl backdrop-blur-xl">
                        <p className="text-cyan-100/50 text-sm">
                            No posts yet — be the first to share something ✨
                        </p>
                    </div>
                )}

                {/* Cards Grid (ONLY ONE GRID) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="group bg-[#0B1B21]/90 border border-cyan-900/40 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition-all duration-300 hover:-translate-y-1"
                        >

                            {/* Image */}
                            <div className="h-44 bg-[#11252d] overflow-hidden">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        alt="post"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-cyan-100/30 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">

                                <h2 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-cyan-300">
                                    {post.title || "Untitled Post"}
                                </h2>

                                <p className="text-cyan-100/50 text-sm mt-2 line-clamp-3">
                                    {post.content || "No content available"}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-5 pt-3 border-t border-cyan-900/40">

                                    <span className="text-[11px] text-cyan-100/40">
                                        {post.createdAt
                                            ? new Date(post.createdAt).toLocaleDateString()
                                            : "Just now"}
                                    </span>

                                    <button
                                        onClick={() => deletePosts(post._id)}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-cyan-700/40 text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white transition"
                                    >
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