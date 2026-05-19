'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { easeAppealing, springGentle } from '@/lib/easing'
import { useLanguage } from '@/context/LanguageContext'
import BlurTransition from '@/components/BlurTransition'

export default function Hero() {
  const { t, locale } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const titleStr = t.hero.title
  const subtitleStr = t.hero.subtitle

  const charVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        delay: 0.3 + i * 0.025,
        ease: easeAppealing,
      },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F5F5F3] px-6"
    >
      {/* 浅色背景光晕 */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
          transition={springGentle}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8F9779]/[0.04] blur-3xl"
        />
        <motion.div
          animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }}
          transition={springGentle}
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#8F9779]/[0.03] blur-3xl"
        />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 flex w-full max-w-7xl flex-col items-start px-6">
        {/* 顶部标签 */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeAppealing }}
          className="mb-12"
        >
          <BlurTransition locale={locale} as="span" className="font-body text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
            {t.header.studio}
          </BlurTransition>
        </motion.div>

        {/* 标题 — 逐字动画（locale 变化时 key 变化强制重渲染） */}
        <h1
          key={locale}
          className="max-w-[90%] font-heading text-5xl font-bold leading-[1.1] tracking-tight text-[#1A1A1A] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem]"
        >
          {titleStr.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={charVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* 分隔线 */}
        <div className="relative mt-16 w-48 overflow-hidden">
          <motion.div
            key={`divider-${locale}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.2,
              delay: titleStr.length * 0.025 + 0.8,
              ease: easeAppealing,
            }}
            className="h-px origin-left bg-gradient-to-r from-[#8F9779]/30 to-transparent"
          />
        </div>

        {/* 副标题 */}
        <BlurTransition locale={locale} as="p" className="mt-8 max-w-xl font-body text-base leading-relaxed text-neutral-500 sm:text-lg">
          {subtitleStr}
        </BlurTransition>

        {/* CTA */}
        <motion.div
          key={`cta-${locale}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: titleStr.length * 0.025 + 1.6,
            ease: easeAppealing,
          }}
          className="mt-14"
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={springGentle}
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#8F9779] px-10 py-4 font-body text-sm font-medium tracking-widest text-white shadow-lg shadow-[#8F9779]/20 transition-all hover:bg-[#7D8569]"
          >
            <BlurTransition locale={locale} as="span" className="relative z-10">{t.hero.cta}</BlurTransition>
            <span className="relative z-10 inline-block text-white/50 transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* 底部滚动提示 */}
      <motion.div
        key={`scroll-${locale}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: titleStr.length * 0.025 + 2.2,
          ease: easeAppealing,
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
          <BlurTransition locale={locale} as="span" className="font-body text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
            {t.hero.scroll}
          </BlurTransition>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: easeAppealing }}
          className="h-10 w-px bg-gradient-to-b from-neutral-300/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
