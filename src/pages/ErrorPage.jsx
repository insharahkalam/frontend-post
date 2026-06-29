import React from 'react'
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] bg-[#0c1418] border border-white/[0.07] rounded-[20px] px-9 py-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.6)]">

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/[0.08] border border-red-500/20 text-red-400/70 text-[10.5px] font-medium uppercase tracking-[0.08em] mb-6">
            <span className="w-[5px] h-[5px] rounded-full bg-red-500/80 animate-pulse" />
            Page not found
          </span>

          {/* 404 */}
          <div className="font-serif text-[5.5rem] leading-none tracking-[-0.04em] mb-2 select-none"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(34,211,238,0.18)" }}>
            404
          </div>

          {/* Title */}
          <h1 className="font-serif text-[1.5rem] text-[#f0f4f5] font-normal leading-snug mb-3">
            Looks like you're{" "}
            <em className="italic text-cyan-400">lost</em>
          </h1>

          {/* Description */}
          <p className="text-[13px] text-white/30 font-light leading-relaxed mb-8">
            The page you're looking for doesn't exist
            <br />or has been moved somewhere else.
          </p>

          <div className="h-px bg-white/[0.06] mb-7" />

          {/* Buttons */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[9px] bg-cyan-400 text-[#05080a] text-[13px] font-medium transition-all duration-150 hover:bg-cyan-300 hover:-translate-y-px"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#05080a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[9px] bg-white/[0.025] border border-white/[0.08] text-white/35 text-[13px] transition-all duration-150 hover:text-white/60 hover:bg-white/[0.05]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>
          </div>

        </div>
      </div>

    </>
  )
}

export default ErrorPage