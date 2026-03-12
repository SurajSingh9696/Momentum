import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const sections = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly when you register — such as your name, email address and password. We also automatically collect usage data (pages visited, features used, timestamps) and device information (browser type, IP address) to operate and improve the service.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your data to provide, maintain and improve Momentum; to personalise your experience (streak calculations, recommendations); to send transactional emails (password reset, streak alerts); and to ensure the security of your account. We do not sell your personal data to third parties.`,
  },
  {
    title: '3. Data Sharing',
    body: `We share data only with service providers who help us operate Momentum (hosting, email delivery, analytics) under strict data-processing agreements. We may disclose data if required by law or to protect the rights and safety of users.`,
  },
  {
    title: '4. Cookies',
    body: `Momentum uses strictly necessary cookies for session management and authentication. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but some features may not function correctly.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your account data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where retention is required by law.`,
  },
  {
    title: '6. Your Rights',
    body: `Depending on your jurisdiction you may have the right to access, correct, delete, or export your personal data. To exercise these rights, email us at privacy@momentum.app. We will respond within 30 days.`,
  },
  {
    title: '7. Security',
    body: `We use industry-standard security measures including TLS encryption in transit, bcrypt password hashing, and JWT-based authentication. No transmission over the internet is 100% secure, however we take reasonable precautions to protect your data.`,
  },
  {
    title: '8. Children\'s Privacy',
    body: `Momentum is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.`,
  },
  {
    title: '9. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via an in-app notice at least 14 days before they take effect.`,
  },
  {
    title: '10. Contact',
    body: `Questions about this policy? Reach us at privacy@momentum.app or write to: Momentum Habit Platform, Internet.`,
  },
];

const PrivacyPolicy = () => (
  <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
    <Header />

    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-24 pb-12 px-6 text-center"
    >
      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
        <span className="material-symbols-outlined text-sm">gpp_good</span>Privacy Policy
      </span>
      <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: March 12, 2026</p>
    </motion.section>

    <section className="px-6 pb-24 max-w-3xl mx-auto">
      <div className="space-y-6">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-slate-900 border border-primary/5 rounded-2xl p-6"
          >
            <h2 className="font-bold text-lg mb-3">{s.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
