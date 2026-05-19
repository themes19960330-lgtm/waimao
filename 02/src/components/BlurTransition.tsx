'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

/**
 * BlurTransition — 用 Framer Motion 实现文字切换时的模糊滤镜过渡
 * 当 locale 变化时，文字从 blur(8px) → blur(0px) 并伴随透明度变化
 */
export default function BlurTransition({
  children,
  locale,
  as = 'span',
  className,
}: {
  children: ReactNode
  locale: string
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}) {
  const Tag = motion[as as keyof typeof motion] as React.ElementType

  return (
    <Tag
      key={locale}
      initial={{ filter: 'blur(8px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </Tag>
  )
}
