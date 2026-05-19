'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const LABELS = {
  en: 'EN',
  zh: '中',
}

export default function LanguageSwitcher() {
  const { locale, toggleLanguage } = useLanguage()

  return (
    <div className="relative z-[9999]">
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center gap-2 rounded-full px-2.5 py-1.5 font-body text-[10px] tracking-[0.15em] transition-colors"
        style={{ color: 'var(--text-tertiary, #999)' }}
      >
        {/* EN — 有动画 */}
        <span className="relative inline-block h-4 w-6 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {locale === 'en' ? (
              <motion.span
                key="en-active"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: 'var(--accent, #8F9779)', fontWeight: 500 }}
              >
                {LABELS.en}
              </motion.span>
            ) : (
              <motion.span
                key="en-inactive"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {LABELS.en}
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* 分隔符 */}
        <span className="text-[8px]" style={{ color: 'var(--text-tertiary, #ccc)' }}>
          /
        </span>

        {/* 中 — 有动画 */}
        <span className="relative inline-block h-4 w-6 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {locale === 'zh' ? (
              <motion.span
                key="zh-active"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: 'var(--accent, #8F9779)', fontWeight: 500 }}
              >
                {LABELS.zh}
              </motion.span>
            ) : (
              <motion.span
                key="zh-inactive"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {LABELS.zh}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  )
}
