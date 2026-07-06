import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthModal from '../pages/AuthModal';

const serif = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const sans = { fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" };

const Navbar = () => {
    const navigate = useNavigate();
    const [authOpen, setAuthOpen] = useState(false);
    const [authTab, setAuthTab] = useState("login");

    const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(token);

    const userName = localStorage.getItem("userName") || "";
    const userImage = localStorage.getItem("userImage") || "";
    const initials = userName
        ? userName
            .trim()
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "?";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userImage");
        toast.success("Logged out");
        navigate("/");
    };

    const openAuth = (tab) => {
        setAuthTab(tab);
        setAuthOpen(true);
    };

    const linkClass = ({ isActive }) =>
        `flex items-center font-medium gap-1.5 px-3.5 py-1.5 rounded-full border text-[11.5px] uppercase tracking-[0.14em] transition-all duration-150 ` +
        (isActive
            ? "text-amber-200 bg-amber-300/[0.08] border-amber-300/25"
            : "text-white/40 border-transparent hover:text-white/70 hover:bg-white/[0.04]");

    return (
        <>
            <nav style={sans} className="sticky top-0 z-50 bg-[#0e0c0a] border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
                <div className="w-full mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2.5 no-underline">
                        <div className="w-[30px] h-[30px] rounded-full bg-amber-300/[0.08] border border-amber-300/25 flex items-center justify-center">
                            <svg className="w-4 h-4 stroke-amber-200" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <span style={serif} className="font-normal text-[1.15rem] text-[#f4ece0] italic tracking-tight">
                            The<em className="not-italic text-amber-200/90"> Journal</em>
                        </span>
                    </NavLink>

                    {/* Nav Links */}
                    <div className="flex items-center gap-1">
                        <NavLink to="/" end className={linkClass}>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                            </svg>
                            Home
                        </NavLink>
                        <NavLink to="/mypost" className={linkClass}>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            My Articles
                        </NavLink>
                        <NavLink to="/create" className={linkClass}>
                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            Write Articles
                        </NavLink>
                    </div>




                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        {isLoggedIn ? (
                            <>
                                {/* User Profile - More Prominent */}
                                <div className="flex items-center gap-2 sm:gap-2.5 pl-1 pr-2.5 sm:pr-3 py-1 rounded-full bg-gradient-to-br from-amber-300/[0.08] to-amber-400/[0.04] border border-amber-300/20 shadow-sm hover:border-amber-300/30 transition-all duration-200">
                                    <div className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-gradient-to-br from-amber-300/[0.15] to-amber-400/[0.08] border border-amber-300/25 flex items-center justify-center text-[11px] sm:text-[11.5px] font-semibold text-amber-200 overflow-hidden shrink-0 shadow-inner">
                                        {userImage ? (
                                            <img src={userImage} alt={userName || "profile"} className="w-full h-full object-cover" />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    {userName && (
                                        <span className="hidden sm:inline text-[12.5px] text-white/70 font-medium max-w-[90px] lg:max-w-[130px] truncate">
                                            {userName}
                                        </span>
                                    )}
                                </div>

                                {/* Logout Button - Improved */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40 text-[11px] sm:text-[12px] font-medium transition-all duration-200 hover:text-rose-300 hover:border-rose-400/30 hover:bg-rose-400/[0.08] active:scale-95"
                                >
                                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => openAuth("signup")}
                                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-amber-200 to-amber-300 text-[#1a1410] text-[12px] sm:text-[12.5px] font-extrabold italic tracking-wide hover:from-amber-100 hover:to-amber-200 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                            >
                                <span>Sign in</span>
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>

                </div>
            </nav>

            <AuthModal
                isOpen={authOpen}
                onClose={() => setAuthOpen(false)}
                defaultTab={authTab}
            />
        </>
    )
}

export default Navbar



