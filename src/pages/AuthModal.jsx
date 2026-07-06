import React, { useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }) {
    const [tab, setTab] = useState(defaultTab); // "login" | "signup"
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    if (!isOpen) return null;

    const resetAll = () => {
        setLoginForm({ email: "", password: "" });
        setSignupForm({ name: "", email: "", password: "" });
        setImage(null);
        setImagePreview(null);
        setShowPassword(false);
    };

    const handleClose = () => {
        resetAll();
        onClose();
    };

    const switchTab = (next) => {
        setTab(next);
        setShowPassword(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    // -------- Login Submit --------
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginForm.email || !loginForm.password) {
            toast.error("Please fill in both fields");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/loginUser", loginForm);
            console.log(res, "res check login....");

            toast.success("Welcome back!");

            // NOTE: backend sends { token, logUser } — not { token, user }
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }
            if (res.data.logUser?.username) {
                localStorage.setItem("userName", res.data.logUser.username);
            }
            if (res.data.logUser?.image) {
                localStorage.setItem("userImage", res.data.logUser.image);
            }
            handleClose();
            navigate("/");

        } catch (err) {
            console.log("FULL ERROR:", err);
            console.log("Response:", err?.response);
            console.log("Status:", err?.response?.status);
            console.log("Data:", err?.response?.data);
            toast.error(err?.response?.data?.message || "Login failed. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    // -------- Signup Submit --------
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupForm;

        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        if (name.length < 4) {
            toast.error("Username must be greater than 4 letters");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (confirmPassword && password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        // Backend requires an image file, so it can't actually be optional
        if (!image) {
            toast.error("Please upload a profile photo");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            // backend (createUser) reads req.body.username, not "name"
            data.append("username", name);
            data.append("email", email);
            data.append("password", password);
            data.append("image", image); // backend checks req.file, field name here just needs to match your multer config (commonly "image")

            await api.post("/auth/users", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Account created successfully!");
            resetAll();
            switchTab("login");
        } catch (err) {
            console.log(err?.response?.data || err.message);
            toast.error(err?.response?.data?.message || "Something went wrong, try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={sans}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[420px] relative max-h-[92vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {/* ambient glow, consistent with hero */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-amber-500/[0.07] rounded-full blur-[110px] pointer-events-none" />

                <div className="relative bg-[#141210] border border-white/[0.07] rounded-[22px] p-7 shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Grain */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
                        }}
                    />

                    {/* Close */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-white/25 hover:text-white/50 hover:bg-white/[0.05] transition-colors duration-150 z-10"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* ── Header ── */}
                    <div className="relative text-center mb-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-200/90 text-[10.5px] font-medium uppercase tracking-[0.28em]">
                            <span className="w-[5px] h-[5px] rounded-full bg-amber-300 animate-pulse" />
                            {tab === "login" ? "Welcome back" : "Join us"}
                        </span>

                        <h1
                            style={{ ...serif, fontVariationSettings: "'SOFT' 60, 'WONK' 0" }}
                            className="mt-4 text-[1.9rem] leading-[1.1] font-light tracking-[-0.02em] text-[#f4ece0]"
                        >
                            {tab === "login" ? (
                                <>Sign <em style={{ ...serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }} className="italic font-normal text-amber-200/90">in</em></>
                            ) : (
                                <>Create <em style={{ ...serif, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }} className="italic font-normal text-amber-200/90">account</em></>
                            )}
                        </h1>
                    </div>

                    {/* ── Tab Switch ── */}
                    <div className="relative flex items-center bg-white/[0.02] border border-white/[0.07] rounded-full p-1 mb-7">
                        <button
                            type="button"
                            onClick={() => switchTab("login")}
                            className={`flex-1 py-2 rounded-full text-[12.5px] font-medium tracking-wide transition-all duration-150 ${tab === "login"
                                ? "bg-amber-200/90 text-[#1a1410]"
                                : "text-white/35 hover:text-white/55"
                                }`}
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            onClick={() => switchTab("signup")}
                            className={`flex-1 py-2 rounded-full text-[12.5px] font-medium tracking-wide transition-all duration-150 ${tab === "signup"
                                ? "bg-amber-200/90 text-[#1a1410]"
                                : "text-white/35 hover:text-white/55"
                                }`}
                        >
                            Sign up
                        </button>
                    </div>

                    {/* ── Login Form ── */}
                    {tab === "login" && (
                        <form onSubmit={handleLogin} className="relative">
                            <div className="mb-5">
                                <label className="block text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={loginForm.email}
                                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full bg-white/[0.025] border border-white/[0.08] rounded-[10px] px-4 py-3 text-[14px] text-[#f4ece0] placeholder:text-white/15 outline-none focus:border-amber-300/40 focus:bg-amber-300/[0.03] transition-colors duration-150"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="w-full bg-white/[0.025] border border-white/[0.08] rounded-[10px] px-4 py-3 pr-11 text-[14px] text-[#f4ece0] placeholder:text-white/15 outline-none focus:border-amber-300/40 focus:bg-amber-300/[0.03] transition-colors duration-150"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/45 transition-colors duration-150"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5 0-9.27-3.11-11-7.5a13.16 13.16 0 012.16-3.19M9.9 4.24A10.94 10.94 0 0112 4c5 0 9.27 3.11 11 7.5a13.07 13.07 0 01-1.67 2.68M14.12 14.12a3 3 0 11-4.24-4.24" />
                                                <path d="M1 1l22 22" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-200/90 text-[#1a1410] text-[13.5px] font-medium tracking-wide transition-all duration-150 hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1a1410]/25 border-t-[#1a1410] animate-spin" />
                                        Signing in…
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* ── Signup Form ── */}
                    {tab === "signup" && (
                        <form onSubmit={handleSignup} className="relative">
                            {/* Profile Image */}
                            <div className="mb-5 flex items-center gap-4">
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-white/[0.025] border border-white/[0.08] overflow-hidden flex items-center justify-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg className="w-5 h-5 stroke-white/20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="8" r="4" />
                                                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
                                            </svg>
                                        )}
                                    </div>
                                    {imagePreview && (
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#141210] border border-white/[0.1] text-white/40 hover:text-rose-300 hover:border-rose-400/30 flex items-center justify-center transition-colors duration-150"
                                        >
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.08] text-[12px] text-white/40 hover:border-amber-300/30 hover:text-amber-200/90 cursor-pointer transition-all duration-150">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <path d="M12 3v12" />
                                        </svg>
                                        {imagePreview ? "Change photo" : "Upload photo"}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                    {/* backend requires an image, so this is not actually optional */}
                                    <p className="text-[10.5px] text-white/20 font-light mt-1.5">Required · up to 5MB</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40 mb-2">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    value={signupForm.name}
                                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                                    placeholder="Jane Doe"
                                    autoComplete="name"
                                    className="w-full bg-white/[0.025] border border-white/[0.08] rounded-[10px] px-4 py-3 text-[14px] text-[#f4ece0] placeholder:text-white/15 outline-none focus:border-amber-300/40 focus:bg-amber-300/[0.03] transition-colors duration-150"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={signupForm.email}
                                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full bg-white/[0.025] border border-white/[0.08] rounded-[10px] px-4 py-3 text-[14px] text-[#f4ece0] placeholder:text-white/15 outline-none focus:border-amber-300/40 focus:bg-amber-300/[0.03] transition-colors duration-150"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/40 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={signupForm.password}
                                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                        placeholder="At least 6 characters"
                                        autoComplete="new-password"
                                        className="w-full bg-white/[0.025] border border-white/[0.08] rounded-[10px] px-4 py-3 pr-11 text-[14px] text-[#f4ece0] placeholder:text-white/15 outline-none focus:border-amber-300/40 focus:bg-amber-300/[0.03] transition-colors duration-150"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/45 transition-colors duration-150"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5 0-9.27-3.11-11-7.5a13.16 13.16 0 012.16-3.19M9.9 4.24A10.94 10.94 0 0112 4c5 0 9.27 3.11 11 7.5a13.07 13.07 0 01-1.67 2.68M14.12 14.12a3 3 0 11-4.24-4.24" />
                                                <path d="M1 1l22 22" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-200/90 text-[#1a1410] text-[13.5px] font-medium tracking-wide transition-all duration-150 hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1a1410]/25 border-t-[#1a1410] animate-spin" />
                                        Creating account…
                                    </>
                                ) : (
                                    <>
                                        Create account
                                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}