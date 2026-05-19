'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const { dict } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // Simulate form submission - replace with actual API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
              {dict.contact.title}
              <br />
              <span className="italic text-champagne">Beautiful</span>
            </h2>
            <p className="text-lg text-ink/60 font-light mb-12 max-w-md">
              {dict.contact.subtitle}
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40 mb-2">Email</p>
                <a href="mailto:hello@studio.design" className="text-sm text-ink/70 hover:text-ink transition-colors">
                  hello@studio.design
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40 mb-2">Response Time</p>
                <p className="text-sm text-ink/70">Within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-ink/40 mb-2">
                  {dict.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={dict.contact.placeholderIdea}
                  className="w-full px-0 py-3 bg-transparent border-b border-stone text-ink placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors duration-300 text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-ink/40 mb-2">
                  {dict.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={dict.contact.placeholderIdea}
                  className="w-full px-0 py-3 bg-transparent border-b border-stone text-ink placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors duration-300 text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-ink/40 mb-2">
                  {dict.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={dict.contact.placeholderIdea}
                  className="w-full px-0 py-3 bg-transparent border-b border-stone text-ink placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors duration-300 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream rounded-full text-sm font-medium tracking-wide hover:bg-charcoal transition-all duration-500 disabled:opacity-50 group"
              >
                {formState === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    {dict.contact.send}
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {formState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sage text-sm"
                >
                  <CheckCircle size={16} />
                  {dict.contact.success}
                </motion.p>
              )}

              {formState === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
                >
                  <AlertCircle size={16} />
                  {dict.contact.error}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
