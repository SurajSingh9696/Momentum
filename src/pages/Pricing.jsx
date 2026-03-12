import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with habit tracking.',
    color: 'border-slate-200 dark:border-slate-700',
    badge: null,
    features: [
      'Up to 5 habits',
      'Basic streak tracking',
      'Community feed (read-only)',
      'Join up to 2 challenges',
      'Email support',
    ],
    cta: 'Get Started',
    ctaStyle: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
    to: '/auth',
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For serious habit builders who want every edge.',
    color: 'border-primary ring-2 ring-primary/30',
    badge: 'Most Popular',
    features: [
      'Unlimited habits',
      'Advanced analytics & heatmaps',
      'Full community access + posting',
      'Unlimited challenges',
      'Custom reminders & AI nudges',
      'Priority support',
    ],
    cta: 'Start 14-day Free Trial',
    ctaStyle: 'bg-primary text-background-dark hover:bg-primary/90 shadow-xl shadow-primary/20',
    to: '/auth',
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per month',
    description: 'Accountability at scale for teams and organisations.',
    color: 'border-slate-200 dark:border-slate-700',
    badge: null,
    features: [
      'Everything in Pro',
      'Up to 20 team members',
      'Team leaderboards',
      'Admin dashboard',
      'SSO & SAML',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
    to: '/contact',
  },
];

const faqs = [
  { q: 'Can I cancel at any time?', a: 'Yes. Cancel with one click from your account settings — no questions asked.' },
  { q: 'Is there a free trial for Pro?', a: 'Absolutely. Every new Pro sign-up gets a full 14-day free trial, no credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and UPI (India).' },
  { q: 'Can I upgrade or downgrade later?', a: 'Yes, you can switch plans at any time. Changes take effect at the start of your next billing cycle.' },
];

const Pricing = () => (
  <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
    <Header />

    {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-16 px-6 text-center"
    >
      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
        <span className="material-symbols-outlined text-sm">sell</span>Pricing
      </span>
      <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
        Simple, honest pricing.
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
        Start free. Upgrade when you're ready. No hidden fees, no dark patterns.
      </p>
    </motion.section>

    {/* Plans */}
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`relative bg-white dark:bg-slate-900 rounded-2xl border-2 ${plan.color} p-8`}
          >
            {plan.badge && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-xs font-bold px-4 py-1 rounded-full">
                {plan.badge}
              </span>
            )}
            <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{plan.description}</p>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-5xl font-black">{plan.price}</span>
              <span className="text-slate-400 mb-1.5 text-sm">/{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to={plan.to}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-xl font-bold transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FAQs */}
    <section className="px-6 pb-24 max-w-3xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-12">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-6"
          >
            <h3 className="font-bold mb-2">{faq.q}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Pricing;
