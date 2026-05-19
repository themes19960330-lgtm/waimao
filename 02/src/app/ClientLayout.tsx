'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '@/context/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {/* 固定导航栏 — 仅放语言切换器 */}
      <nav className="fixed top-0 right-0 z-[9998] flex items-center gap-4 px-8 py-6">
        <LanguageSwitcher />
        <a
          href="#contact"
          className="font-body text-[10px] tracking-[0.2em] text-neutral-500 underline underline-offset-4 decoration-neutral-300/30 transition-colors hover:text-neutral-700"
        >
          START A PROJECT
        </a>
      </nav>
      {children}
    </LanguageProvider>
  )
}
