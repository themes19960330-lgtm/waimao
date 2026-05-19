'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeAppealing, springGentle } from '@/lib/easing'
import { useLanguage } from '@/context/LanguageContext'
import BlurTransition from '@/components/BlurTransition'

export default function Contact() {
  const { t, locale } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [interest, setInterest] = useState('')

  // 监听来自 Services 板块的 "Inquire" 事件
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setInterest(e.detail)
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `Interested in: ${e.detail}\n\n`,
      }))
    }
    window.addEventListener('set-interest', handler as EventListener)
    return () => window.removeEventListener('set-interest', handler as EventListener)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="relative w-full bg-[#F5F5F3] px-6 pb-40 pt-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[#8F9779]/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* 区块标题 */}
        <motion.div
          key={`contact-header-${locale}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeAppealing }}
          className="mb-20"
        >
          <BlurTransition locale={locale} as="span" className="font-body text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
            {t.contact.tag}
          </BlurTransition>
          <BlurTransition locale={locale} as="h2" className="font-heading mt-5 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl md:text-6xl">
            {t.contact.title}
          </BlurTransition>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: easeAppealing }}
            className="mt-8 h-px w-16 origin-left bg-gradient-to-r from-[#8F9779]/30 to-transparent"
          />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* ─── 左侧: 介绍 + 预购卡片 ─── */}
          <motion.div
            key={`contact-left-${locale}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeAppealing }}
            className="flex flex-col gap-10"
          >
            {/* 描述 */}
            <p className="font-body text-base leading-relaxed text-neutral-500 sm:text-lg">
              {t.contact.description}
            </p>

            {/* 预付定金卡片 */}
            <div className="rounded-2xl border border-neutral-200/50 bg-white/60 p-6 shadow-[0_4px_16px_rgb(0,0,0,0.02)] backdrop-blur-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-1">
                  <h3 className="font-body text-[11px] tracking-[0.2em] text-neutral-500 uppercase">
                    {t.contact.preBook}
                  </h3>
                  <p className="font-body mt-2 text-sm leading-relaxed text-neutral-500">
                    {t.contact.preBookDesc}
                  </p>
                  <div className="mt-4">
                    <span className="font-heading text-2xl font-bold tracking-tight text-[#1A1A1A]">{t.contact.preBookAmount}</span>
                    <span className="font-body ml-2 text-[10px] text-neutral-400">
                      {t.contact.preBookLabel}
                    </span>
                  </div>
                  <motion.a
                    href="https://your-shopify-store.myshopify.com/cart/4123456789:1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springGentle}
                    className="mt-5 inline-flex items-center gap-3 rounded-xl bg-[#8F9779] px-6 py-3 font-body text-xs font-medium text-white shadow-md shadow-[#8F9779]/15 transition-all hover:bg-[#7D8569]"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t.contact.preBookButton}
                  </motion.a>
                </div>
              </div>
            </div>

            {/* 直接联系方式 */}
            <div className="font-body text-xs text-neutral-400">
              <p>{t.contact.direct}</p>
              <div className="mt-3 space-y-2">
                <a href="mailto:studio@visualatelier.com" className="block underline underline-offset-4 decoration-neutral-300/30 transition-colors hover:text-neutral-600">
                  {t.contact.emailAddress}
                </a>
                <span className="block">{t.contact.wechat}</span>
              </div>
            </div>
          </motion.div>

          {/* ─── 右侧: 表单 ─── */}
          <motion.div
            key={`contact-form-${locale}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeAppealing }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: easeAppealing }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/50 bg-white/70 p-12 text-center backdrop-blur-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8F9779]/10">
                    <svg className="h-6 w-6 text-[#8F9779]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading mt-6 text-2xl font-bold tracking-tight text-[#1A1A1A]">
                    {t.contact.thankYou}
                  </h3>
                  <p className="font-body mt-3 text-sm text-neutral-500">
                    {t.contact.thankYouDesc}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-body mt-8 text-[10px] tracking-[0.2em] text-neutral-400 underline underline-offset-4 decoration-neutral-300/30 transition-colors hover:text-neutral-600"
                  >
                    {t.contact.submit}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-neutral-200/50 bg-white/70 p-6 backdrop-blur-sm sm:p-8"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="font-body block text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                        {t.contact.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.namePlaceholder}
                        className="font-body mt-2 w-full border-b border-neutral-200/60 bg-transparent pb-3 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-neutral-300 focus:border-[#8F9779]"
                      />
                    </div>

                    <div>
                      <label className="font-body block text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.emailPlaceholder}
                        className="font-body mt-2 w-full border-b border-neutral-200/60 bg-transparent pb-3 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-neutral-300 focus:border-[#8F9779]"
                      />
                    </div>

                    <div>
                      <label className="font-body block text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                        {t.contact.message}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.messagePlaceholder}
                        className="font-body mt-2 w-full resize-none border-b border-neutral-200/60 bg-transparent pb-3 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-neutral-300 focus:border-[#8F9779]"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springGentle}
                    className="mt-8 w-full rounded-xl bg-[#8F9779] px-8 py-4 font-body text-xs font-medium tracking-widest text-white shadow-md shadow-[#8F9779]/15 transition-all hover:bg-[#7D8569]"
                  >
                    {t.contact.submit}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
