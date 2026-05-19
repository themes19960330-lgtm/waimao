'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowDown } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 80, rotateX: -40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const fadeUpBlur = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Hero() {
  const { dict } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleText = dict.hero.title;
  const titleWords = titleText.split(' ');

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.8], [0, 4]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-ivory" />

        {/* Electric accent orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,51,255,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], x: [0, 20, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,197,185,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div
        style={{
          y: parallaxY,
          scale: parallaxScale,
          opacity: parallaxOpacity,
          filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-electric/70 mb-8"
        >
          {dict.hero.greeting}
        </motion.p>

        {/* Animated Title */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-ink leading-[1.1] mb-8"
        >
          {titleWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.15em]">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterAnimation}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          ))}
          <br />
          <motion.span
            variants={letterAnimation}
            className="inline-block italic text-electric"
          >
            Design
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpBlur}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-ink/60 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
        >
          {dict.hero.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <a
            href="#works"
            className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream rounded-full text-sm font-medium tracking-wide hover:bg-electric transition-all duration-500 group"
          >
            {dict.hero.cta}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-ink/30"
          >
            <span className="text-xs tracking-widest uppercase">{dict.hero.scrollHint}</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
