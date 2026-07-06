import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

const CATEGORIES = ['Technology', 'Culture', 'Science', 'Business', 'Design', 'Environment', 'Sports'];

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !shortDescription.trim() || !content.trim() || !category || !image) {
      toast.error("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to create a post");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("shortDescription", shortDescription.trim());
      formData.append("content", content.trim());
      formData.append("category", category);
      formData.append("image", image);

      console.log(formData, "form data check");

      const res = await api.post("/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res, "response check");
      toast.success("Post created successfully!");
      navigate("/");
      resetForm();
    } catch (err) {
      console.error("Error in create:", err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const charPercent = Math.round((content.length / 2000) * 100);
  const descPercent = Math.round((shortDescription.length / 160) * 100);

  return (
    <>
      <Navbar />
      <div style={sans} className="relative min-h-screen bg-[#0e0c0a] flex items-center justify-center px-4 py-14 overflow-hidden">

        {/* Warm ambient glows, consistent with hero */}
        <div className="pointer-events-none absolute -top-40 -left-32 w-[560px] h-[560px] bg-amber-500/[0.06] rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-56 right-0 w-[480px] h-[480px] bg-rose-500/[0.04] rounded-full blur-[120px]" />

        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
          }}
        />

        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-[520px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.07] rounded-[22px] px-7 py-8 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        >
          {/* ── Header ── */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
              <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
              New Article
            </span>

            <h1
              style={{ ...serif, fontVariationSettings: "'SOFT' 60, 'WONK' 0" }}
              className="mt-4 mb-1 text-[2.1rem] leading-[1.1] font-light tracking-[-0.02em] text-[#f4ece0]"
            >
              Share your{" "}
              <em style={{ ...serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }} className="italic font-normal text-amber-200/90">
                story
              </em>
            </h1>
            <p className="text-xs text-white/35 font-light">Publish a post to your feed</p>
          </div>

          <div className="h-px bg-white/[0.06] mb-6" />

          {/* ── Title ── */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40">Title</label>
              <span className="text-[10.5px] text-white/25">{title.length} / 120</span>
            </div>
            <input
              type="text"
              placeholder="Write a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-white/[0.025] border border-white/[0.08]
                text-[#f4ece0] text-sm font-light placeholder:text-white/15 outline-none
                transition-all duration-150 focus:border-amber-300/40 focus:bg-amber-300/[0.03]"
            />
          </div>

          {/* ── Short Description ── */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40">Short Description</label>
              <span className="text-[10.5px] text-white/25">{shortDescription.length} / 160</span>
            </div>
            <div className="relative">
              <textarea
                placeholder="A brief summary shown in previews and cards..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={2}
                maxLength={160}
                className="w-full px-3.5 py-2.5 rounded-[10px] bg-white/[0.025] border border-white/[0.08]
                  text-[#f4ece0] text-sm font-light placeholder:text-white/15 outline-none resize-none
                  leading-relaxed transition-all duration-150 focus:border-amber-300/40 focus:bg-amber-300/[0.03]"
              />
              <div className="absolute bottom-2.5 right-2.5 w-10 h-[2px] rounded-full bg-white/[0.07] overflow-hidden">
                <div className="h-full rounded-full bg-amber-300/60 transition-all duration-150" style={{ width: `${descPercent}%` }} />
              </div>
            </div>
            <p className="text-[10.5px] text-white/25 mt-1.5 font-light">Shown as a preview on the feed cards.</p>
          </div>

          {/* ── Category ── */}
          <div className="mb-4">
            <label className="block mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-9 rounded-[10px] bg-white/[0.025] border border-white/[0.08]
                  text-sm font-light outline-none appearance-none cursor-pointer
                  transition-all duration-150 focus:border-amber-300/40 focus:bg-amber-300/[0.03] text-[#f4ece0]"
                style={{ colorScheme: 'dark' }}
              >
                <option value="" disabled className="bg-[#181410] text-white/30">Select a category...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#181410] text-[#f4ece0]">{cat}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 stroke-white/25 pointer-events-none"
                viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="mb-4">
            <label className="block mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40">Content</label>
            <textarea
              placeholder="Tell your story in full..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              maxLength={2000}
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-white/[0.025] border border-white/[0.08]
                text-[#f4ece0] text-sm font-light placeholder:text-white/15 outline-none resize-none
                leading-relaxed transition-all duration-150 focus:border-amber-300/40 focus:bg-amber-300/[0.03]"
            />
          </div>

          {/* ── Image Upload ── */}
          <div className="mb-6">
            <label className="block mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40">Cover Image</label>
            <label
              htmlFor="image"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] bg-white/[0.025]
                border border-dashed border-white/10 cursor-pointer
                transition-all duration-150 hover:border-amber-300/30 hover:bg-amber-300/[0.03] group"
            >
              <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                <svg className="w-4 h-4 stroke-white/30 group-hover:stroke-amber-200/70 transition-colors duration-150"
                  viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[13px] text-white/40 group-hover:text-white/60 transition-colors duration-150">
                  {preview ? "Image selected — click to change" : "Click to upload a cover image"}
                </span>
                <span className="block text-[11px] text-white/22 mt-0.5">PNG or JPG recommended</span>
              </div>
              {preview && (
                <img src={preview} alt="Preview" className="w-10 h-10 flex-shrink-0 rounded-lg object-cover border border-white/10" />
              )}
            </label>
            <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-14 h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
                <div className="h-full rounded-full bg-amber-300 transition-all duration-150" style={{ width: `${charPercent}%` }} />
              </div>
              <span className="text-[11px] text-white/25 whitespace-nowrap">{content.length} / 2000</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-200/90
                text-[#1a1410] text-[13px] font-medium tracking-wide
                transition-all duration-150 hover:bg-amber-100
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1a1410]/25 border-t-[#1a1410] animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  Publish
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}