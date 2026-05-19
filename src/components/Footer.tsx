'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Heart } from 'lucide-react';

export default function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="py-16 border-t border-stone/50 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-baseline gap-1.5 mb-4">
              <span className="text-lg font-display font-bold tracking-tight text-ink">WAM</span>
              <span className="text-xs font-sans font-light text-ink/40 tracking-widest uppercase">Visuals</span>
          <span className="text-electric text-lg">.</span>
            </a>
            <p className="text-sm text-ink/50 font-light leading-relaxed max-w-xs">
              {dict.splash.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40 mb-4">Navigate</h3>
            <div className="flex flex-col gap-3">
              <a href="#works" className="text-sm text-ink/60 hover:text-ink transition-colors">{dict.nav.works}</a>
              <a href="#pricing" className="text-sm text-ink/60 hover:text-ink transition-colors">{dict.nav.pricing}</a>
              <a href="#contact" className="text-sm text-ink/60 hover:text-ink transition-colors">{dict.nav.contact}</a>
              <a href="/client/demo" className="text-sm text-ink/60 hover:text-ink transition-colors">{dict.nav.clientPortal}</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40 mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@wamvisuals.com" className="text-sm text-ink/60 hover:text-ink transition-colors">
                hello@wamvisuals.com
              </a>
              <p className="text-sm text-ink/40">Response within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div className="mb-10 text-center">
          <p className="text-sm text-ink/40 font-light italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;{dict.footer.slogan}&rdquo;
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-stone/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink/30">
            &copy; {new Date().getFullYear()} WAM Visuals. {dict.footer.rights}
          </p>
          <p className="text-xs text-ink/30 flex items-center gap-1.5">
            {dict.footer.madeWith} <Heart size={10} className="text-electric" />
          </p>
        </div>
      </div>
    </footer>
  );
}
