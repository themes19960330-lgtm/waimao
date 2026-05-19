'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const { dict, locale } = useLanguage();
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    window.dispatchEvent(new CustomEvent('dawn-transition'));
    setTimeout(() => {
      onEnter();
    }, 2200);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark splash background */}
      <motion.div
        className="absolute inset-0 bg-night"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Film grain overlay */}
        <div className="absolute inset-0 bg-grain-dark opacity-50" />

        {/* Subtle warm gold glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,159,107,0.04) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Dawn light overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={exiting ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={exiting ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(251,251,250,0.3) 40%, rgba(251,251,250,0.6) 70%, #FBFBFA 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <div className="text-center px-6">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="w-12 h-px bg-electric/50 mx-auto mb-10 origin-center"
          />

          {/* Brand name */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="text-xs font-sans font-extralight uppercase tracking-[0.4em] text-white/30 mb-8"
          >
            WAM Visuals
          </motion.p>

          {/* Slogan - Cormorant Garamond, large, wide letter-spacing, text-shimmer */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className={`text-4xl md:text-6xl lg:text-7xl font-display font-light leading-[1.15] mb-6 ${
              locale === 'zh' ? 'tracking-[0.15em]' : 'tracking-[0.2em]'
            }`}
          >
            <span className="text-shimmer">
              {dict.splash.tagline}
            </span>
          </motion.h1>

          {/* Sub-slogan - all caps, ultra-light sans */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-xs md:text-sm font-sans font-extralight uppercase tracking-[0.35em] text-white/25 mb-10"
          >
            {dict.splash.subSlogan}
          </motion.p>

          {/* Enter Button - frosted glass style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.button
              onClick={handleEnter}
              disabled={exiting}
              className="relative group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative px-10 py-4 rounded-full backdrop-blur-md bg-white/[0.04] border border-white/[0.08] group-hover:border-white/[0.2] transition-all duration-700 overflow-hidden">
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-white/[0.04] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={exiting ? { opacity: 1, backgroundColor: 'rgba(184,159,107,0.15)' } : {}}
                />
                <span className="relative z-10 text-xs font-sans font-extralight tracking-[0.3em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-500">
                  {exiting ? dict.splash.entering : dict.splash.enterBtn}
                </span>
              </div>

              {/* Glow ring */}
              <motion.div
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
                }}
                animate={exiting ? { opacity: 1, scale: 3 } : {}}
                transition={{ duration: 1.2 }}
              />
            </motion.button>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 2, ease: [0.76, 0, 0.24, 1] }}
            className="w-8 h-px bg-white/10 mx-auto mt-12 origin-center"
          />
        </div>
      </div>

      {/* Dawn particles */}
      {exiting && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute z-15 w-1 h-1 rounded-full bg-white/20"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
                opacity: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 1.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
