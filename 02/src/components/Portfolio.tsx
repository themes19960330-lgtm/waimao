'use client'

import { useCallback, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { easeAppealing } from '@/lib/easing'
import { useLanguage } from '@/context/LanguageContext'
import BlurTransition from '@/components/BlurTransition'

// ──────────────────────────────────────────
// 类型 — 数据来源: Shopify Products API
// ──────────────────────────────────────────
export interface PortfolioProject {
  id: string | number
  title: string
  subtitle: string
  category: string
  imageUrl?: string
  gradient: string
  slug?: string
}

// ──────────────────────────────────────────
// 客户端卡片组件 (保持 Framer Motion 动效)
// ──────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject
  index: number
}) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 1,
        delay: 0.1 + index * 0.15,
        ease: easeAppealing,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      data-cursor-hover
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]"
    >
      <div
        className={`relative h-[28rem] w-full bg-gradient-to-br ${project.gradient} transition-all duration-1000`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      >
        {/* 悬浮遮盖 */}
        <div
          className={`absolute inset-0 bg-white/10 backdrop-blur-[1px] transition-all duration-1000 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
        />

        {/* 内容 */}
        <div className="absolute inset-0 flex flex-col justify-end p-10">
          <div>
            <span className="font-body inline-block rounded-full bg-white/80 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-neutral-500 shadow-sm backdrop-blur-sm transition-colors duration-500">
              {project.category}
            </span>
          </div>

          <div className="mt-auto">
            <h3
              className="font-heading text-4xl font-bold tracking-tight text-[#1A1A1A] transition-all duration-700 sm:text-5xl"
              style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
            >
              {project.title}
            </h3>
            <p className="font-body mt-2 text-sm tracking-[0.15em] text-neutral-500">
              {project.subtitle}
            </p>

            {/* 咨询同类设计 */}
            <motion.a
              href={`/work/${project.slug || project.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: easeAppealing, delay: isHovered ? 0.1 : 0 }}
              className="font-body relative z-20 mt-4 inline-block text-[11px] tracking-[0.15em] text-[#8F9779] underline underline-offset-4 decoration-[#8F9779]/20 transition-colors hover:text-[#7D8569]"
            >
              {t.portfolio.viewDetail}
            </motion.a>
          </div>
        </div>

        {/* 鼠标跟随光晕 */}
        <motion.div
          className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${springX.get() * 100 + 50}% ${
              springY.get() * 100 + 50
            }%, rgba(143,151,121,0.08), transparent 40%)`,
          }}
        />

        {/* 悬停箭头 */}
        <motion.div
          initial={{ opacity: 0, x: -8, y: -8 }}
          animate={isHovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -8, y: -8 }}
          transition={{ duration: 0.4, ease: easeAppealing }}
          className="absolute bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#8F9779] shadow-lg shadow-[#8F9779]/20"
        >
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ──────────────────────────────────────────
// 服务器组件 — 接收从 page.tsx 传入的数据
// ──────────────────────────────────────────
type PortfolioClientProps = {
  projects: PortfolioProject[]
}

export default function Portfolio({ projects }: PortfolioClientProps) {
  const { t, locale } = useLanguage()
  return (
    <section id="portfolio" className="relative w-full bg-[#F5F5F3] px-6 py-32 sm:py-40">
      {/* 极淡氛围 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/2 h-[600px] w-[600px] rounded-full bg-[#8F9779]/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* 区块标题 */}
        <motion.div
          key={`portfolio-header-${locale}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeAppealing }}
          className="mb-20"
        >
          <BlurTransition locale={locale} as="span" className="font-body text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
            {t.portfolio.tag}
          </BlurTransition>
          <BlurTransition locale={locale} as="h2" className="font-heading mt-5 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl md:text-6xl">
            {t.portfolio.title}
          </BlurTransition>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: easeAppealing }}
            className="mt-8 h-px w-16 origin-left bg-gradient-to-r from-[#8F9779]/30 to-transparent"
          />
        </motion.div>

        {/* 2x2 网格 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
