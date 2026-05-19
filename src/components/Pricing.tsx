'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { pricingTiers } from '@/data/pricing';
import { Check, Shield } from 'lucide-react';

const categoryLabels = {
  graphic: 'graphicDesign',
  vi: 'viDesign',
  ecommerce: 'ecommerceDesign',
} as const;

export default function Pricing() {
  const { dict } = useLanguage();
  const [withAfterSales, setWithAfterSales] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'graphic' | 'vi' | 'ecommerce'>('graphic');

  const categories = [
    { key: 'graphic' as const, label: dict.pricing.graphicDesign },
    { key: 'vi' as const, label: dict.pricing.viDesign },
    { key: 'ecommerce' as const, label: dict.pricing.ecommerceDesign },
  ];

  const filteredTiers = pricingTiers.filter((tier) => tier.category === activeCategory);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
            {dict.pricing.title}
          </h2>
          <p className="text-lg text-ink/60 max-w-xl mx-auto font-light">
            {dict.pricing.subtitle}
          </p>
          <p className="text-sm text-ink/40 mt-3 max-w-md mx-auto italic">
            {dict.pricing.description}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-ink text-cream'
                  : 'bg-transparent text-ink/60 hover:text-ink border border-stone'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* After-sales Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium transition-colors ${!withAfterSales ? 'text-ink' : 'text-ink/40'}`}>
            {dict.pricing.withoutAfterSales}
          </span>
          <button
            onClick={() => setWithAfterSales(!withAfterSales)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              withAfterSales ? 'bg-sage' : 'bg-stone'
            }`}
          >
            <motion.div
              animate={{ x: withAfterSales ? 28 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${withAfterSales ? 'text-ink' : 'text-ink/40'}`}>
            {dict.pricing.withAfterSales}
          </span>
          <Shield size={16} className="text-sage" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-ink/40 mb-12 max-w-lg mx-auto"
        >
          {dict.pricing.toggleLabel}
        </motion.p>

        {/* Pricing Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {filteredTiers.map((tier, index) => {
            const price = withAfterSales ? tier.priceWithAfterSales : tier.priceWithoutAfterSales;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-2xl p-8 transition-all duration-500 ${
                  tier.popular
                    ? 'bg-ink text-cream shadow-xl ring-1 ring-champagne/30'
                    : 'bg-cream text-ink border border-stone'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-champagne text-ink text-xs font-semibold rounded-full">
                      {dict.pricing.popular}
                    </span>
                  </div>
                )}

                <h3 className={`text-2xl font-display font-semibold mb-2 ${tier.popular ? 'text-cream' : 'text-ink'}`}>
                  {tier.name}
                </h3>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${tier.popular ? 'text-cream' : 'text-ink'}`}>
                    ${price.toLocaleString()}
                  </span>
                  <span className={`text-sm ml-2 ${tier.popular ? 'text-cream/60' : 'text-ink/40'}`}>
                    USD
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((featureKey) => (
                    <li key={featureKey} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          tier.popular ? 'text-champagne' : 'text-sage'
                        }`}
                      />
                      <span className={`text-sm ${tier.popular ? 'text-cream/80' : 'text-ink/70'}`}>
                        {dict.pricing.features[featureKey]}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={`text-xs mb-6 ${tier.popular ? 'text-cream/50' : 'text-ink/40'}`}>
                  ~{tier.deliveryDays} business days delivery
                </div>

                <a
                  href={`https://shopify.com/checkout?tier=${tier.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    tier.popular
                      ? 'bg-champagne text-ink hover:bg-champagne/90'
                      : 'bg-ink text-cream hover:bg-charcoal'
                  }`}
                >
                  {dict.pricing.secureSlot}
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Shopify Checkout URL placeholder */}
        <div className="hidden" aria-hidden="true">
          SHOPIFY_CHECKOUT_URL_PLACEHOLDER
        </div>
      </div>
    </section>
  );
}
