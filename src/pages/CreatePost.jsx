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

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#071013] px-4 py-8">

            {/* Glow Background */}
            <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-emerald-400/10 rounded-full blur-3xl"></div>

            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#0f172a",
                        color: "#fff",
                        border: "1px solid #164e63",
                    },
                }}
            />

            {/* Card */}
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl bg-[#0B1B21]/90 border border-cyan-900/40 backdrop-blur-xl rounded-[28px] shadow-[0_0_35px_rgba(34,211,238,0.08)] p-5 sm:p-7"
            >

                {/* Heading */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                        Create Post
                    </h1>

                    <p className="text-cyan-100/60 mt-2 text-xs sm:text-sm">
                        Share your thoughts ✨
                    </p>
                </div>



                {/* Title */}
                <div className="mb-4">
                    <label className="block text-xs text-cyan-100/70 mb-1">
                        Title
                    </label>

                    <input
                        type="text"
                        placeholder="Write a catchy title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={120}
                        className="w-full px-4 py-3 rounded-xl bg-[#11252d] border border-cyan-900/40 text-white placeholder:text-cyan-100/30 outline-none focus:border-cyan-400 text-sm"
                    />
                </div>

                {/* Content */}
                <div className="mb-2">
                    <label className="block text-xs text-cyan-100/70 mb-1">
                        Content
                    </label>

                    <textarea
                        placeholder="Tell your story..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        maxLength={2000}
                        className="w-full px-4 py-3 rounded-xl bg-[#11252d] border border-cyan-900/40 text-white placeholder:text-cyan-100/30 outline-none resize-none focus:border-emerald-400 text-sm"
                    />
                </div>

                {/* Upload */}

                <label
                    htmlFor="image"
                    className="w-full h-14 flex items-center justify-between px-4 rounded-xl border border-cyan-700/40 bg-[#11252d] cursor-pointer hover:border-cyan-400 transition"
                >

                    <span className="text-sm text-cyan-100/70">
                        Upload post Image
                    </span>

                    {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-10 h-10 rounded-md object-cover border border-cyan-500/30"
                        />
                    ) : (
                        <span className="text-xs text-cyan-100/40">
                            PNG, JPG
                        </span>
                    )}

                </label>

                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 gap-3">

                    <p className="text-[11px] text-cyan-100/40">
                        {content.length}/2000
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium shadow-md shadow-cyan-500/20 hover:scale-[1.03] transition disabled:opacity-60"
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );

}