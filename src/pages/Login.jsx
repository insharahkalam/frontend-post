import React, { useState } from "react";
import api from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in both fields");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/login", form);
            console.log(res, "login res check");
            toast.success("Welcome back!");

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4 py-10 relative overflow-hidden">
            <Toaster />

            {/* ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-400/[0.05] rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-[420px] relative">
                {/* ── Header ── */}
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/[0.08] border border-cyan-400/20 text-cyan-300 text-[10.5px] font-medium uppercase tracking-widest">
                        <span className="w-[5px] h-[5px] rounded-full bg-cyan-400 animate-pulse" />
                        Welcome back
                    </span>

                    <h1 className="mt-3 text-[2.2rem] leading-[1.1] font-serif font-normal tracking-tight text-[#f0f4f5]">
                        Sign{" "}
                        <em className="italic text-cyan-400 font-serif">in</em>
                    </h1>
                    <p className="text-xs text-white/30 font-light mt-2">
                        Continue to your account
                    </p>
                </div>

                {/* ── Form Card ── */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#0c1418] border border-white/[0.07] rounded-[20px] p-7 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                >
                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-[11px] font-medium uppercase tracking-widest text-white/30 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full bg-[#0a1115] border border-white/[0.07] rounded-[10px] px-4 py-3 text-[14px] text-[#e8f0f2] placeholder:text-white/15 outline-none focus:border-cyan-400/40 focus:bg-[#0a1115] transition-colors duration-150"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-[11px] font-medium uppercase tracking-widest text-white/30">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-[11px] text-cyan-400/70 hover:text-cyan-300 font-light transition-colors duration-150"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full bg-[#0a1115] border border-white/[0.07] rounded-[10px] px-4 py-3 pr-11 text-[14px] text-[#e8f0f2] placeholder:text-white/15 outline-none focus:border-cyan-400/40 transition-colors duration-150"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors duration-150"
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[9px] bg-cyan-400 text-[#05080a] text-[13.5px] font-medium tracking-wide transition-all duration-150 hover:bg-cyan-300 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#05080a]/20 border-t-[#05080a] animate-spin" />
                                Signing in…
                            </>
                        ) : (
                            <>
                                Sign in
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#05080a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                {/* ── Footer ── */}
                <p className="text-center text-[13px] text-white/30 font-light mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-150">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}