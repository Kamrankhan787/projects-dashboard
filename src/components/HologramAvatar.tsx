"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HologramAvatar() {
  return (
    <div className="relative flex items-center justify-center w-52 h-52 md:w-64 md:h-64 select-none">
      {/* Outermost pulsing ring */}
      <div className="absolute inset-0 rounded-full border border-cyber-cyan/10 animate-ping [animation-duration:3s]" />

      {/* Orbit ring 1 */}
      <div className="absolute inset-0 rounded-full border border-cyber-cyan/20 rotate-12">
        <div
          className="absolute top-1/2 left-1/2 -mt-1.5 -ml-1.5 w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"
          style={{ animation: "orbit 6s linear infinite" }}
        />
      </div>

      {/* Orbit ring 2 — tilted */}
      <div className="absolute w-[110%] h-[110%] rounded-full border border-cyber-purple/20 -rotate-45">
        <div
          className="absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-cyber-purple shadow-[0_0_8px_#bd00ff]"
          style={{ animation: "orbit 9s linear infinite reverse" }}
        />
      </div>

      {/* Orbit ring 3 */}
      <div className="absolute w-[90%] h-[90%] rounded-full border border-cyber-blue/15 rotate-[60deg]">
        <div
          className="absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_8px_#0072ff]"
          style={{ animation: "orbit 12s linear infinite" }}
        />
      </div>

      {/* Holographic core glow */}
      <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-cyber-purple/20 via-cyber-blue/15 to-cyber-cyan/20 blur-2xl animate-pulse-slow" />

      {/* Main avatar hexagon frame */}
      <div className="hologram-container relative z-10 w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
        {/* Rotating outer hex border */}
        <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan/30 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border border-cyber-purple/25" style={{ animation: "spin 12s linear infinite reverse" }} />

        {/* Central AI core */}
        <div className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#0d0a1e] to-[#06040f] border border-cyber-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.2),inset_0_0_20px_rgba(189,0,255,0.1)]">

          {/* Grid lines inside core */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            <div className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,240,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "14px 14px"
              }}
            />
          </div>

          {/* AI Symbol */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-black text-cyber-cyan text-neon-cyan animate-flicker">
              Ω
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-cyber-cyan"
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            <span className="text-[8px] font-mono text-cyber-cyan/60 tracking-[0.2em] uppercase">
              AI NODE
            </span>
          </div>

          {/* Scan line overlay */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/60 to-transparent"
              style={{ animation: "scan-line 2.5s linear infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Status dots */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
        </span>
        <span className="text-[9px] font-mono text-cyber-green/80 uppercase tracking-wider">Online</span>
      </div>

      {/* Floating data labels */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -right-4 px-2 py-1 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 text-[9px] font-mono text-cyber-purple"
      >
        LLM.v4
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-2 -left-4 px-2 py-1 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-[9px] font-mono text-cyber-cyan"
      >
        RAG.sys
      </motion.div>
    </div>
  );
}
