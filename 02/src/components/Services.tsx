'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  FileText,
  ChevronDown,
  Sparkles,
  Palette,
  LayoutGrid,
  Image as ImageIcon,
  ShoppingCart,
  ArrowUpRight,
} from 'lucide-react'
import { SERVICE_CATEGORIES, type ServiceItem } from '@/data/services'
import { easeAppealing, springGentle } from '@/lib/easing'
import { useLanguage } from '@/context/LanguageContext'
import BlurTransition from '@/components/BlurTransition'

// ──────────────────────────────────────────
// 类别图标映射
// ──────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'brand-vi': <Palette className="h-4 w-4" strokeWidth={1.5} />,
  'visual-comm': <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />,
  'digital-commerce': <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />,
  'essentials': <ImageIcon className="h-4 w-4" strokeWidth={1.5} />,
}

// ──────────────────────────────────────────
// 价格切换开关
// ──────────────────────────────────────────
function PriceToggle({
  withAfterSales,
  onChange,
}: {
  withAfterSales: boolean
  onChange: (v: boolean) => void
}) {
  const { t } = useLanguage()
  return (
    <div className="flex items-center gap-4">
      <span
        className={`font-body text-[10px] tracking-[0.15em] transition-colors ${
          withAfterSales ? 'text-neutral-700' : 'text-neutral-300'
        }`}
      >
        {t.services.afterSales}
      </span>
      <button
        onClick={() => onChange(!withAfterSales)}
        className={`relative h-5 w-10 rounded-full transition-colors ${
          withAfterSales ? 'bg-[#8F9779]' : 'bg-neutral-200'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm ${
            withAfterSales ? 'left-[22px]' : 'left-[2px]'
          }`}
        />
      </button>
      <span
        className={`font-body text-[10px] tracking-[0.15em] transition-colors ${
          !withAfterSales ? 'text-neutral-700' : 'text-neutral-300'
        }`}
      >
        {t.services.original}
      </span>
    </div>
  )
}

// ──────────────────────────────────────────
// 单个服务项卡片
// ──────────────────────────────────────────
function ServiceRow({
  item,
  index,
  withAfterSales,
}: {
  item: ServiceItem
  index: number
  withAfterSales: boolean
}) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  const shopifyCheckoutUrl = item.shopifyVariantId
    ? `https://your-shopify-store.myshopify.com/cart/${item.shopifyVariantId}:1`
    : '#'

  const handleInquire = () => {
    if (item.isStandard && item.shopifyVariantId) {
      window.open(shopifyCheckoutUrl, '_blank', 'noopener')
    } else {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
        window.dispatchEvent(
          new CustomEvent('set-interest', { detail: item.name })
        )
      }
    }
  }

  const priceText = withAfterSales
    ? item.priceWithAfterSales
    : item.priceWithoutAfterSales

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: easeAppealing }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex items-center justify-between border-b border-neutral-100/80 px-4 py-4 transition-colors hover:bg-neutral-50/50 sm:px-6"
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-body text-sm font-medium text-[#1A1A1A]">
          {item.name}
        </h4>
        <div className="mt-1.5 flex flex-wrap items-center gap-3">
          {item.draftPlan !== '0 Drafts (Direct)' && (
            <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400">
              <FileText className="h-3 w-3" strokeWidth={1.5} />
              {item.draftPlan}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {typeof item.deliveryDays === 'number'
              ? `${item.deliveryDays} Days`
              : item.deliveryDays}
          </span>
          {item.remarks && (
            <span className="text-[10px] text-neutral-300">· {item.remarks}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 shrink-0">
        <div className="text-right">
          <AnimatePresence mode="wait">
            <motion.span
              key={priceText}
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.3, ease: easeAppealing }}
              className="font-heading block text-lg font-bold tracking-tight text-[#1A1A1A]"
            >
              {priceText}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleInquire}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={springGentle}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[10px] tracking-[0.15em] transition-all ${
            item.isStandard
              ? 'bg-[#8F9779]/10 text-[#8F9779] hover:bg-[#8F9779] hover:text-white'
              : 'border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
          }`}
        >
          <span>{item.isStandard ? t.services.inquire : t.services.inquire}</span>
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ──────────────────────────────────────────
// 可折叠分类 Accordion
// ──────────────────────────────────────────
function CategoryAccordion({
  category,
  isOpen,
  onToggle,
  withAfterSales,
}: {
  category: (typeof SERVICE_CATEGORIES)[number]
  isOpen: boolean
  onToggle: () => void
  withAfterSales: boolean
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/50 bg-white shadow-[0_4px_16px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgb(0,0,0,0.04)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 transition-colors hover:bg-neutral-50/50"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F9779]/10 text-[#8F9779]">
            {CATEGORY_ICONS[category.id]}
          </div>
          <div className="text-left">
            <h3 className="font-heading text-base font-semibold tracking-tight text-[#1A1A1A]">
              {category.name}
            </h3>
            <p className="font-body mt-0.5 text-xs leading-relaxed text-neutral-400">
              {category.description}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeAppealing }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-400"
        >
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeAppealing }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-100/80">
              {category.items.map((item, i) => (
                <ServiceRow
                  key={item.id}
                  item={item}
                  index={i}
                  withAfterSales={withAfterSales}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ──────────────────────────────────────────
// 主组件导出
// ──────────────────────────────────────────
export default function ServicesSection() {
  const { t, locale } = useLanguage()
  const [withAfterSales, setWithAfterSales] = useState(true)
  const [openCategory, setOpenCategory] = useState<string | null>('brand-vi')

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id)
  }

  return (
    <section
      id="services"
      className="relative w-full bg-[#FBFBFA] px-6 py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#8F9779]/[0.02] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#8F9779]/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeAppealing }}
          className="mb-6"
        >
          <BlurTransition locale={locale} as="span" className="font-body text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
            {t.services.tag}
          </BlurTransition>
          <BlurTransition locale={locale} as="h2" className="font-heading mt-5 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl md:text-6xl">
            {t.services.title}
          </BlurTransition>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: easeAppealing }}
            className="mt-8 h-px w-16 origin-left bg-gradient-to-r from-[#8F9779]/30 to-transparent"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeAppealing }}
          className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-body max-w-xl text-sm leading-relaxed text-neutral-500">
            Premium design services tailored for discerning brands. Toggle to view
            pricing with or without our comprehensive after-sales support
            &mdash; including revision rounds, file format exports, and dedicated
            account management.
          </p>
          <PriceToggle
            withAfterSales={withAfterSales}
            onChange={setWithAfterSales}
          />
        </motion.div>

        <div className="space-y-4">
          {SERVICE_CATEGORIES.map((category) => (
            <CategoryAccordion
              key={category.id}
              category={category}
              isOpen={openCategory === category.id}
              onToggle={() => toggleCategory(category.id)}
              withAfterSales={withAfterSales}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: easeAppealing }}
          className="mt-10 text-center font-body text-[10px] leading-relaxed text-neutral-400"
        >
          {t.services.footnote}{' '}
          <a
            href="#contact"
            className="underline underline-offset-4 decoration-neutral-300/30 transition-colors hover:text-neutral-600"
          >
            {t.services.contact}
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}
