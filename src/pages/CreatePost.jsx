import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // -------- Auth Guard --------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to create a post");
      navigate("/");
    }
  }, []);

  // -------- Handlers --------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
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

    if (!title.trim() || !content.trim() || !image) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);

      const res = await api.post("/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data, "response check");

      toast.success("Post created successfully!");
      navigate("/");
      resetForm();
    } catch (err) {
      console.error(err.message, "error in create");
      toast.error(err?.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const charPercent = Math.round((content.length / 2000) * 100);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4 py-10">

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] bg-[#0c1418] border border-white/[0.07] rounded-[20px] px-7 py-8 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        >
          {/* ── Header ── */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/[0.08] border border-cyan-400/20 text-cyan-300 text-[10.5px] font-medium uppercase tracking-widest">
              <span className="w-[5px] h-[5px] rounded-full bg-cyan-400 animate-pulse" />
              New post
            </span>

            <h1 className="mt-3 mb-1 text-[2rem] leading-[1.15] font-serif font-normal tracking-tight text-[#f0f4f5]">
              Share your{" "}
              <em className="italic text-cyan-400 font-serif">story</em>
            </h1>
            <p className="text-xs text-white/30 font-light">
              Publish a post to your feed
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-6" />

          {/* ── Title Field ── */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-white/40">
                Title
              </label>
              <span className="text-[10.5px] text-white/20">{title.length} / 120</span>
            </div>
            <input
              type="text"
              placeholder="Write a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-white/[0.025] border border-white/[0.08] text-[#e8f0f2] text-sm font-light placeholder:text-white/15 outline-none transition-all duration-150 focus:border-cyan-400/40 focus:bg-cyan-400/[0.025]"
            />
          </div>

          {/* ── Content Field ── */}
          <div className="mb-4">
            <label className="block mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-white/40">
              Content
            </label>
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              maxLength={2000}
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-white/[0.025] border border-white/[0.08] text-[#e8f0f2] text-sm font-light placeholder:text-white/15 outline-none resize-none leading-relaxed transition-all duration-150 focus:border-cyan-400/40 focus:bg-cyan-400/[0.025]"
            />
          </div>

          {/* ── Image Upload ── */}
          <div className="mb-6">
            <label className="block mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-white/40">
              Cover Image
            </label>

            <label
              htmlFor="image"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] bg-white/[0.025] border border-dashed border-white/10 cursor-pointer transition-all duration-150 hover:border-cyan-400/30 hover:bg-cyan-400/[0.025] group"
            >
              <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                <svg
                  className="w-4 h-4 stroke-white/30 group-hover:stroke-cyan-400/60 transition-colors duration-150"
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

              <div className="flex-1 min-w-0">
                <span className="block text-[13px] text-white/40 group-hover:text-white/55 transition-colors duration-150">
                  {preview ? "Image selected — click to change" : "Click to upload an image"}
                </span>
                <span className="block text-[11px] text-white/20 mt-0.5">PNG or JPG</span>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-10 h-10 flex-shrink-0 rounded-lg object-cover border border-white/10"
                />
              )}
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-14 h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-150"
                  style={{ width: `${charPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-white/20 whitespace-nowrap">
                {content.length} / 2000
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-cyan-400 text-[#05080a] text-[13px] font-medium tracking-wide transition-all duration-150 hover:bg-cyan-300 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#05080a]/20 border-t-[#05080a] animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  Publish
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#05080a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22 11 13 2 9l20-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}