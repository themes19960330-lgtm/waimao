'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Download, Eye, MessageCircle, CreditCard, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function ClientPortal({ params }: { params: { orderId: string } }) {
  const { dict } = useLanguage();
  const { orderId } = params;

  // Mock order data
  const order = {
    id: orderId,
    status: 'inProgress' as 'inProgress' | 'review' | 'completed',
    depositPaid: true,
    balancePaid: false,
    files: ['Brand_Guidelines.pdf', 'Logo_Package.zip', 'Social_Media_Kit.zip'],
  };

  const statusIcon = {
    inProgress: <Clock size={20} className="text-electric" />,
    review: <Eye size={20} className="text-champagne" />,
    completed: <CheckCircle size={20} className="text-sage" />,
  };

  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Back link */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
            {dict.clientPortal.title}
          </h1>
          <p className="text-lg text-ink/60 font-light">
            Order <span className="font-mono text-electric">#{orderId}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Status Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="md:col-span-2 bg-ivory rounded-2xl p-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40 mb-6">
              {dict.clientPortal.status}
            </h2>
            <div className="flex items-center gap-4 mb-8">
              {statusIcon[order.status]}
              <span className="text-lg font-medium text-ink">
                {dict.clientPortal.statusLabels[order.status]}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-stone rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: order.status === 'completed' ? '100%' : order.status === 'review' ? '70%' : '45%' }}
                transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="h-full bg-electric rounded-full"
              />
            </div>

            <div className="flex justify-between mt-3 text-xs text-ink/40">
              <span>{dict.clientPortal.deposit}</span>
              <span>{dict.clientPortal.finalPayment}</span>
            </div>
          </motion.div>

          {/* Payment Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="bg-ivory rounded-2xl p-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40 mb-6">
              {dict.clientPortal.deposit}
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard size={20} className="text-sage" />
              <span className="text-sm text-ink/70">
                {order.depositPaid ? 'Paid' : 'Pending'}
              </span>
            </div>

            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40 mb-6">
              {dict.clientPortal.finalPayment}
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard size={20} className="text-ink/30" />
              <span className="text-sm text-ink/70">
                {order.balancePaid ? 'Paid' : 'Pending'}
              </span>
            </div>

            {!order.balancePaid && (
              <a
                href={`https://shopify.com/checkout?order=${orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-electric text-white rounded-full text-sm font-medium hover:bg-electric-light transition-colors"
              >
                Pay Balance
              </a>
            )}
          </motion.div>

          {/* Files Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-ivory rounded-2xl p-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40 mb-6">
              {dict.clientPortal.download}
            </h2>
            <div className="space-y-3">
              {order.files.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between py-3 px-4 bg-cream rounded-xl hover:bg-stone/50 transition-colors group cursor-pointer"
                >
                  <span className="text-sm text-ink/70 group-hover:text-ink transition-colors">
                    {file}
                  </span>
                  <Download size={16} className="text-ink/30 group-hover:text-ink transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Messages Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="bg-ivory rounded-2xl p-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40 mb-6">
              {dict.clientPortal.messages}
            </h2>
            <div className="flex flex-col items-center text-center py-8">
              <MessageCircle size={32} className="text-ink/20 mb-4" />
              <p className="text-sm text-ink/40">
                Use the chat widget in the bottom-right corner to send us a message.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Shopify Checkout URL placeholder */}
        <div className="hidden" aria-hidden="true">
          SHOPIFY_CHECKOUT_URL_PLACEHOLDER
        </div>
      </div>
    </main>
  );
}
