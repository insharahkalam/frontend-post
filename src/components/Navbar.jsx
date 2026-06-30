import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const handleLogout = () => {
        // apna logout logic yahan — token clear karein
        localStorage.removeItem("token");
        navigate("/login");
    };

    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        `flex items-center font-semibold font-serif tracking-wide gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs transition-all duration-150 ` +
        (isActive
            ? "text-cyan-400 bg-cyan-400/[0.07] border-cyan-400/20"
            : "text-white/40 border-transparent hover:text-white/70 hover:bg-white/[0.04]");

    return (
        <>
            <nav className="sticky top-0 z-50 bg-[#0c1418] border-b border-white/[0.07] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2.5 no-underline">
                        <div className="w-[30px] h-[30px] rounded-lg bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
                            <svg className="w-4 h-4 stroke-cyan-400" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <span className="font-serif font-semibold text-[1.1rem] text-[#f0f4f5] italic">
                            Pulse<em className="text-cyan-400">Feed</em>
                        </span>
                    </NavLink>

                    {/* Nav Links */}
                    <div className="flex items-center gap-1">
                        <NavLink to="/post" className={linkClass}>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                            </svg>
                            All Articles
                        </NavLink>
                        <NavLink to="/my-posts" className={linkClass}>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            My Articles
                        </NavLink>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2.5">
                        {/* Avatar — logged in user ke initials */}
                        <div className="w-[30px] h-[30px] rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-[11.5px] font-medium text-cyan-400">
                            AK
                        </div>

                        <div className="w-px h-[18px] bg-white/[0.07]" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.025] border border-white/[0.08] text-white/35 text-[12px] transition-all duration-150 hover:text-red-400/80 hover:border-red-400/25 hover:bg-red-400/[0.06]"
                        >
                            <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar