"use client";
import React from "react";
import { motion } from "framer-motion";

export default function OptimizedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A] pointer-events-none opacity-40">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(44, 52, 128, 0.15) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(0,0,0,0) 70%)' }}
      />
    </div>
  );
}
export { OptimizedBackground as ShaderAnimation, OptimizedBackground as NeuralBackground, OptimizedBackground as ShaderLines, OptimizedBackground as GradientBars };
