// import React, { useState } from 'react'
// import { NavLink, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import AuthModal from '../pages/AuthModal';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [authOpen, setAuthOpen] = useState(false);
//     const [authTab, setAuthTab] = useState("login");

//     const token = localStorage.getItem("token");
//     const isLoggedIn = Boolean(token);

//     // optional: agar tum login pe user ka naam/email/image bhi
//     // localStorage mein save karte ho, to profile yahan se nikal sakte ho
//     const userName = localStorage.getItem("userName") || "";
//     const userImage = localStorage.getItem("userImage") || "";
//     const initials = userName
//         ? userName
//             .trim()
//             .split(" ")
//             .map((w) => w[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase()
//         : "?";

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userName");
//         localStorage.removeItem("userImage");
//         toast.success("Logged out");
//         navigate("/");
//     };

//     const openAuth = (tab) => {
//         setAuthTab(tab);
//         setAuthOpen(true);
//     };

//     const linkClass = ({ isActive }) =>
//         `flex items-center font-semibold font-serif tracking-wide gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs transition-all duration-150 ` +
//         (isActive
//             ? "text-cyan-400 bg-cyan-400/[0.07] border-cyan-400/20"
//             : "text-white/40 border-transparent hover:text-white/70 hover:bg-white/[0.04]");

//     return (
//         <>
//             <nav className="sticky top-0 z-50 bg-[#0c1418] border-b border-white/[0.07] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
//                 <div className="w-full mx-auto px-15 h-14 flex items-center justify-between">

//                     {/* Logo */}
//                     <NavLink to="/" className="flex items-center gap-2.5 no-underline">
//                         <div className="w-[30px] h-[30px] rounded-lg bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
//                             <svg className="w-4 h-4 stroke-cyan-400" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
//                             </svg>
//                         </div>
//                         <span className="font-serif font-semibold text-[1.1rem] text-[#f0f4f5] italic">
//                             Pulse<em className="text-cyan-400">Feed</em>
//                         </span>
//                     </NavLink>

//                     {/* Nav Links */}
//                     <div className="flex items-center gap-1">
//                         <NavLink to="/" className={linkClass}>
//                             <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//                                 <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
//                                 <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
//                             </svg>
//                             All Articles
//                         </NavLink>
//                         <NavLink to="/mypost" className={linkClass}>
//                             <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                                 <circle cx="12" cy="7" r="4" />
//                             </svg>
//                             My Articles
//                         </NavLink>
//                     </div>

//                     {/* Right Side */}
//                     <div className="flex items-center gap-2.5">
//                         {isLoggedIn ? (
//                             <>
//                                 {/* Profile — image (agar hai) ya initials + naam */}
//                                 <div className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white/[0.025] border border-white/[0.07]">
//                                     <div className="w-[26px] h-[26px] rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-[10.5px] font-medium text-cyan-400 overflow-hidden shrink-0">
//                                         {userImage ? (
//                                             <img src={userImage} alt={userName || "profile"} className="w-full h-full object-cover" />
//                                         ) : (
//                                             initials
//                                         )}
//                                     </div>
//                                     {userName && (
//                                         <span className="text-[12px] text-white/55 font-light max-w-[110px] truncate">
//                                             {userName}
//                                         </span>
//                                     )}
//                                 </div>

//                                 <button
//                                     onClick={handleLogout}
//                                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.025] border border-white/[0.08] text-white/35 text-[12px] transition-all duration-150 hover:text-red-400/80 hover:border-red-400/25 hover:bg-red-400/[0.06]"
//                                 >
//                                     <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                                         <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <button
//                                     onClick={() => openAuth("signup")}
//                                     className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 text-[#05080a] text-[12.5px] font-semibold font-serif tracking-wide hover:bg-cyan-500 transition-all duration-150"
//                                 >
//                                     Sign in
//                                 </button>
//                             </>
//                         )}
//                     </div>

//                 </div>
//             </nav>

//             <AuthModal
//                 isOpen={authOpen}
//                 onClose={() => setAuthOpen(false)}
//                 defaultTab={authTab}
//             />
//         </>
//     )
// }

// export default Navbar



import { useState } from "react"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header id="navbar" className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
            <div className="nav-blur border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between h-[72px]">
                        <a href="#top" className="flex items-center gap-2.5 focus-ring rounded">
                            <span className="font-display italic text-2xl text-paper tracking-tight">Longhand</span>
                            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-marigold border border-marigold/40 rounded-full px-2 py-0.5">
                                Vol. 12
                            </span>
                        </a>

                        <nav className="hidden lg:flex items-center gap-9 font-medium text-sm text-paper/80">
                            {["Featured", "Categories", "Latest", "Trending", "Authors", "Newsletter"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="hover:text-marigold transition-colors focus-ring rounded"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <button
                                aria-label="Search articles"
                                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-paper/80 hover:text-marigold hover:bg-white/5 transition-colors focus-ring"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </button>

                            <a
                                href="#newsletter"
                                className="bg-marigold text-ink text-sm font-semibold px-4 py-2 rounded-full hover:bg-paper transition-colors focus-ring"
                            >
                                Subscribe
                            </a>

                            <button
                                aria-label="Open menu"
                                className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center focus-ring rounded"
                                onClick={() => setMenuOpen((v) => !v)}
                            >
                                <span className="block w-5 h-[2px] bg-paper" />
                                <span className="block w-5 h-[2px] bg-paper" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="lg:hidden bg-ink border-b border-white/10">
                    <nav className="flex flex-col px-6 py-4 gap-4 font-medium text-paper/80">
                        {["Featured", "Categories", "Latest", "Trending", "Authors", "Newsletter"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="hover:text-marigold"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}