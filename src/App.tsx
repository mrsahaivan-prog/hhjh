/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playSuccessChime } from './components/AudioEngine';
import { ConfettiShower } from './components/ConfettiShower';

export default function App() {
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  // Play a welcoming premium chime on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiTrigger((prev) => prev + 1);
      playSuccessChime();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const triggerCelebration = () => {
    setConfettiTrigger((prev) => prev + 1);
    playSuccessChime();
  };

  return (
    <div className="h-screen w-screen bg-[#03040b] text-gray-100 flex flex-col items-center justify-center font-sans relative overflow-hidden px-4 selection:bg-mz-gold/30 selection:text-white">
      {/* 1. Subtle, high-end celebratory background elements */}
      <ConfettiShower triggerKey={confettiTrigger} />
      
      {/* Luxurious glowing gradient orbs in background */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[35%] rounded-full bg-gradient-to-r from-mz-cyan/15 via-mz-purple/40 to-mz-gold/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-mz-blue/5 blur-[100px] pointer-events-none" />

      {/* 2. Main High-Density Social Proof Card Container (Completely compact for screenshot) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onClick={triggerCelebration}
        className="cursor-pointer relative w-full max-w-md rounded-[2rem] p-6 sm:p-8 border border-white/10 bg-[#060814]/90 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col items-center text-center space-y-5"
        id="premium-social-proof-certificate"
      >
        {/* Holographic metallic shine overlay across the card */}
        <div className="absolute inset-0 pointer-events-none hologram-shimmer opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(0,210,255,0.03)_50%,transparent_55%)] bg-[size:25px_25px] opacity-60 pointer-events-none" />

        {/* Dynamic decorative golden border glow */}
        <div className="absolute -inset-1.5 rounded-[2.2rem] bg-gradient-to-r from-mz-gold via-mz-cyan to-mz-blue opacity-20 blur-xl pointer-events-none" />

        {/* TOP: Brand logo exactly matching provided image */}
        <div className="relative z-10">
          <div className="bg-white/[0.04] border border-white/10 px-5 py-1.5 rounded-lg flex items-center justify-center space-x-1 backdrop-blur-md shadow-lg">
            <span className="font-display font-black text-lg tracking-tight text-white">MZ</span>
            <span className="font-display font-black text-lg tracking-tight text-mz-cyan text-glow-cyan">+</span>
          </div>
        </div>

        {/* MID HEADER: Badge & Title */}
        <div className="space-y-3 relative z-10">
          {/* Elite dynamic badge requested */}
          <div className="inline-flex items-center space-x-1.5 bg-mz-gold/10 border border-mz-gold/20 rounded-full px-3 py-1 text-[9px] text-mz-gold font-mono tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-mz-gold animate-ping" />
            <span>INSCRIPTION CONFIRMÉE • PREMIER REGISTRE</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white leading-tight">
            🎉 Félicitations <span className="text-transparent bg-clip-text bg-gradient-to-r from-mz-gold via-[#fff1cc] to-mz-gold text-glow-gold">Alexandre Gauthier</span> <span className="inline-block animate-bounce" style={{ animationDuration: '3s' }}>🇫🇷</span> !
          </h1>

          <p className="text-[10px] font-mono text-mz-cyan tracking-[0.18em] uppercase font-bold text-glow-cyan">
            L'opportunité conçue pour créer les futurs pionniers.
          </p>
        </div>

        {/* Divider line */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-mz-gold/40 to-transparent relative z-10" />

        {/* CORE TEXT: Minimalist, high-end content body - extremely compact */}
        <div className="space-y-4 text-gray-200 text-xs sm:text-sm leading-relaxed relative z-10">
          <p className="text-gray-300">
            Vous faites désormais partie des <strong className="text-white text-glow-cyan font-bold bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-md">150 premiers membres</strong> de <span className="font-display font-bold">MZ+</span>.
          </p>

          <p className="font-semibold text-white">
            Vous venez de franchir une étape importante.
          </p>

          <p className="text-gray-300">
            Votre chemin vers la <strong className="text-mz-gold font-semibold text-glow-gold">liberté financière</strong> avec MZ+ commence dès aujourd’hui.
          </p>

          <p className="text-white/95 font-bold text-sm sm:text-base pt-1">
            Bienvenue dans cette nouvelle aventure.
          </p>
        </div>

        {/* BUTTON: Commencer à construire votre richesse */}
        <div className="pt-2 w-full relative z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerCelebration();
            }}
            className="w-full relative group cursor-pointer bg-gradient-to-r from-mz-cyan via-mz-blue to-mz-cyan bg-[size:200%_auto] hover:bg-[position:right_center] transition-all duration-500 text-black font-display font-black text-[10px] sm:text-xs tracking-widest uppercase py-3.5 rounded-xl shadow-xl shadow-mz-cyan/15 text-glow-cyan flex items-center justify-center space-x-2 active:scale-98"
          >
            <span>🔘</span>
            <span>Commencer à construire votre richesse</span>
          </button>
        </div>

        {/* Helper instruction */}
        <p className="text-[8px] font-mono text-white/30 tracking-wider">
          💡 TOUCHEZ POUR DÉCLENCHER CONFETTIS & SONS
        </p>
      </motion.div>

      {/* 3. Small minimalist signature brand */}
      <footer className="absolute bottom-4 text-center text-[9px] font-mono text-white/20 tracking-widest z-20">
        MZ+ © 2026 • LE FUTUR DE LA LIBERTÉ FINANCIÈRE.
      </footer>
    </div>
  );
}
