import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
export default function CreatePostForm() {
    // -------- State --------
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    // -------- Handlers --------
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        console.log(file, "check file");

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setImage(null);
        setPreview(null);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!title.trim() || !content.trim() || !image) {
            console.log(image);

            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("image", image);

            // Replace with your API endpoint
            const res = await api.post("/create", formData);
            console.log(res.data, "respone check");


            toast.success("Post created successfully!");
            navigate('/post')
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    // -------- UI --------
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden bg-[#0b1020]">

            <Toaster position="top-right" toastOptions={{ style: { background: "#1f2937", color: "#fff" } }} />

            {/* Glass card */}
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300 hover:shadow-purple-500/20"
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2 tracking-tight">
                    Create Post
                </h1>
                <p className="text-center text-gray-400 mb-8 text-sm">
                    Share something amazing with your community
                </p>

                {/* Image upload */}
                <label
                    htmlFor="image"
                    className="group relative flex flex-col items-center justify-center w-full h-56 sm:h-64 mb-6 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 cursor-pointer overflow-hidden transition-all duration-300 hover:border-purple-400/60 hover:bg-white/10"
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-purple-300 transition-colors">
                            {/* Upload icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M16.5 12L12 7.5m0 0L7.5 12M12 7.5v9"
                                />
                            </svg>
                            <span className="text-sm font-medium">Click to upload an image</span>
                            <span className="text-xs mt-1 text-gray-500">PNG, JPG up to 5MB</span>
                        </div>
                    )}
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>

                {/* Title */}
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={120}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-400 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/30"
                    />
                </div>

                {/* Content */}
                <div className="mb-6">
                    <textarea
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        maxLength={2000}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none resize-none transition-all duration-200 focus:border-purple-400 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/30"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                            Publishing...
                        </>
                    ) : (
                        "Publish Post"
                    )}
                </button>
            </form>
        </div>
    );
}

