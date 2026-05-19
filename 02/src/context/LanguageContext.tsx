// ═══════════════════════════════════════════════════════════════
// LanguageContext — 轻量国际化系统
// 所有文案内联定义，无需额外 JSON 文件
// ═══════════════════════════════════════════════════════════════
'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

// ──────────────────────────────────────────
// 语言类型
// ──────────────────────────────────────────
export type Locale = 'en' | 'zh'

// ──────────────────────────────────────────
// 字典定义 — 摒弃平庸机翻，使用显贵行业术语
// ──────────────────────────────────────────
export type Dict = typeof EN_DICT

const EN_DICT = {
  header: {
    studio: 'STUDIO NOUVEAU — EST. 2026',
    cta: 'START A PROJECT',
    services: 'SERVICES',
    contact: 'CONTACT',
  },
  hero: {
    title:
      'We Craft Exquisite Visual Identities for Visionary Brands.',
    subtitle:
      'Studio Nouveau defines the future of premium brand experiences through strategic design and high-end aesthetics.',
    scroll: 'Scroll to discover',
    cta: 'VIEW SELECTED WORKS',
  },
  portfolio: {
    tag: 'Selected Works',
    title: 'Curated Gallery',
    viewDetail: 'View Project Details',
    inquire: 'Inquire about this style',
  },
  services: {
    tag: 'Bespoke Services',
    title: 'Investment',
    original: 'Original',
    afterSales: 'After-Sales Included',
    contact: 'contact our team',
    footnote: 'All prices in USD. For comprehensive quotations,',
    inquire: 'INQUIRE',
    drafts: 'Drafts',
    days: 'Days',
  },
  contact: {
    tag: 'Let\'s Collaborate',
    title: 'Start Your Project',
    description:
      'Every visionary project begins with a conversation. Share your ideas and let\'s craft something extraordinary together.',
    name: 'Name',
    namePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    message: 'Project Idea',
    messagePlaceholder:
      'Tell us about your vision, goals, and what you have in mind...',
    submit: 'Send Inquiry',
    thankYou: 'Thank You',
    thankYouDesc:
      'Your message has been received. We\'ll reach out within 24 hours.',
    preBook: 'Pre-Book Your Creative Slot',
    preBookDesc:
      'Secure your creative session with a fully refundable deposit.',
    preBookAmount: '$199',
    preBookLabel: 'refundable deposit',
    preBookButton: 'Pay Deposit via Shopify',
    direct: 'Prefer to reach out directly?',
    emailAddress: 'studio@visualatelier.com',
    wechat: 'visual_atelier',
  },
  client: {
    title: 'Client Portal',
    order: 'Order',
    status: 'Pending Payment',
    message:
      'Your bespoke design strategy is ready. Please settle the remaining balance to unlock high-resolution deliverables.',
    remaining: 'remaining balance',
    locked: 'High-resolution assets (locked)',
    button: 'Pay Remaining Balance',
    security:
      'Secured by Shopify · SSL encrypted payment · 256-bit encryption',
    back: '← BACK TO STUDIO',
  },
  footer: {
    copyright: '© All rights reserved.',
  },
}

const ZH_DICT: Dict = {
  header: {
    studio: 'STUDIO NOUVEAU — 创于 2026',
    cta: '开启项目',
    services: '服务',
    contact: '联系',
  },
  hero: {
    title: '我们为远见卓识的品牌，雕琢超凡脱俗的视觉灵魂。',
    subtitle:
      'Studio Nouveau 以战略级设计与高定美学，重新定义高端品牌体验的未来。',
    scroll: '向下探索',
    cta: '浏览精选作品',
  },
  portfolio: {
    tag: '精选作品',
    title: '策展式作品集',
    viewDetail: '查看项目详情',
    inquire: '咨询同类风格',
  },
  services: {
    tag: '定制服务',
    title: '投资方案',
    original: '基础价',
    afterSales: '含售后维护',
    contact: '联系我们的团队',
    footnote: '所有价格以美元计。如需完整报价，请',
    inquire: '咨询',
    drafts: '初稿',
    days: '交付周期',
  },
  contact: {
    tag: '携手共创',
    title: '开启您的项目',
    description:
      '每一个非凡的项目，始于一次深度的对话。分享您的构想，让我们共同铸就卓越。',
    name: '姓名',
    namePlaceholder: '请输入您的全名',
    email: '邮箱',
    emailPlaceholder: 'your@email.com',
    message: '项目构想',
    messagePlaceholder: '请描述您的愿景、目标与初步想法……',
    submit: '发送咨询',
    thankYou: '感谢您',
    thankYouDesc: '已收到您的留言。我们将在 24 小时内与您联系。',
    preBook: '预付定金 · 预留档期',
    preBookDesc: '支付可退还定金，预留专属创作档期。',
    preBookAmount: '$199',
    preBookLabel: '可退还定金',
    preBookButton: '通过 Shopify 支付定金',
    direct: '或直接联系我们：',
    emailAddress: 'studio@visualatelier.com',
    wechat: 'visual_atelier',
  },
  client: {
    title: '客户门户',
    order: '订单',
    status: '待付款',
    message: '您的专属设计方案已就绪。请结清尾款，解锁高解析交付文件。',
    remaining: '待付尾款',
    locked: '高解析素材（已锁定）',
    button: '支付尾款',
    security: 'Shopify 安全担保 · SSL 加密支付 · 256 位加密',
    back: '← 返回主站',
  },
  footer: {
    copyright: '© 保留所有权利。',
  },
}

const DICTIONARIES: Record<Locale, Dict> = {
  en: EN_DICT,
  zh: ZH_DICT,
}

// ──────────────────────────────────────────
// Context
// ──────────────────────────────────────────
type LanguageContextType = {
  locale: Locale
  toggleLanguage: () => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextType | null>(null)

// ──────────────────────────────────────────
// Provider
// ──────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  // 水合后读取 localStorage
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('studio-locale') as Locale | null
    if (stored === 'en' || stored === 'zh') {
      setLocale(stored)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'en' ? 'zh' : 'en'
      localStorage.setItem('studio-locale', next)
      return next
    })
  }, [])

  // 防止水合不匹配：服务端渲染英文，客户端水合后再同步
  const t = mounted ? DICTIONARIES[locale] : DICTIONARIES.en

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ──────────────────────────────────────────
// Hook
// ──────────────────────────────────────────
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within <LanguageProvider>')
  }
  return ctx
}
