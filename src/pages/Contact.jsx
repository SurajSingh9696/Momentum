import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const faqs = [
  { q: 'How quickly do you respond?', a: 'We aim to reply within 24 hours on business days.' },
  { q: 'I found a bug — who do I tell?', a: 'Please email bugs@momentum.app with a description and screenshots. We take bugs seriously and fix them fast.' },
  { q: 'Can I request a feature?', a: 'Absolutely! Use the form above and select "Feature Request". We read every submission.' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Enquiry', message: '' });
  const [sent, setSent] = useState(false);

  const subjects = ['General Enquiry', 'Technical Support', 'Billing', 'Feature Request', 'Partnership', 'Press'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens default mail client as a simple no-backend contact method
    const mailto = `mailto:hello@momentum.app?subject=${encodeURIComponent(`[${form.subject}] ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-16 px-6 text-center"
      >
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <span className="material-symbols-outlined text-sm">mail</span>Contact
        </span>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          We'd love to <span className="text-primary">hear from you.</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Questions, feedback, bugs or partnership ideas — drop us a message and we'll get back to you.
        </p>
      </motion.section>

      <section className="px-6 pb-24 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8"
        >
          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-xl font-black mb-2">Message ready!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Your email client has opened with the message pre-filled. Just press Send!</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-primary text-sm font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-black mb-6">Send a message</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Subject *</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  {subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-background-dark py-3 rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Info + FAQs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick links */}
          {[
            { icon: 'mail', label: 'General enquiries', value: 'hello@momentum.app', href: 'mailto:hello@momentum.app' },
            { icon: 'bug_report', label: 'Bug reports', value: 'bugs@momentum.app', href: 'mailto:bugs@momentum.app' },
            { icon: 'code', label: 'GitHub', value: 'github.com/SurajSingh9696', href: 'https://github.com/SurajSingh9696' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-primary/10 hover:border-primary/40 rounded-2xl p-4 transition-all group"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            </a>
          ))}

          {/* FAQs */}
          <div className="space-y-3 pt-2">
            <h3 className="font-black text-lg">Quick answers</h3>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-primary/5 rounded-xl p-4"
              >
                <p className="font-semibold text-sm mb-1">{faq.q}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
