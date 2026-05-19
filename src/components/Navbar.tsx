'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { locale, dict, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: dict.nav.works, href: '#works' },
    { label: dict.nav.pricing, href: '#pricing' },
    { label: dict.nav.contact, href: '#contact' },
    { label: dict.nav.clientPortal, href: '/client/demo' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-1.5">
          <span className="text-lg font-display font-bold tracking-tight text-ink">
            WAM
          </span>
          <span className="text-xs font-sans font-light text-ink/40 tracking-widest uppercase">
            Visuals
          </span>
          <span className="text-electric text-lg">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </a>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLocale}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone text-xs font-medium text-ink/70 hover:text-ink hover:border-electric hover:text-electric transition-all duration-300"
          >
            <span className={`transition-colors ${locale === 'en' ? 'text-electric' : 'text-ink/40'}`}>EN</span>
            <span className="text-stone">/</span>
            <span className={`transition-colors ${locale === 'zh' ? 'text-electric' : 'text-ink/40'}`}>ZH</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="md:hidden bg-cream border-t border-stone overflow-hidden"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-ink/70 hover:text-ink transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 text-sm font-medium text-ink/70"
            >
              <span className={locale === 'en' ? 'text-ink' : 'text-ink/40'}>EN</span>
              <span className="text-stone">/</span>
              <span className={locale === 'zh' ? 'text-ink' : 'text-ink/40'}>ZH</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
