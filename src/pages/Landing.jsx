import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Scene3D from '../components/Scene3D';

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: 'notifications_active',
      title: 'Daily Accountability',
      description:
        'Stay on track with friendly reminders that adapt to your schedule. Our AI nudge engine knows exactly when you need a push.',
    },
    {
      icon: 'groups',
      title: 'Group Challenges',
      description:
        'Join others in shared goals. Compete, collaborate, and celebrate milestones together with thousands of like-minded builders.',
    },
    {
      icon: 'show_chart',
      title: 'Visual Progress',
      description:
        'See your streaks grow beautifully. Our dynamic heatmaps and graphs make your progress impossible to ignore.',
    },
  ];

  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
      <Header transparent />

      <main className="w-full">
        {/* Hero Section */}
        <motion.section
          style={{ opacity, scale }}
          className="relative overflow-hidden pt-20 pb-24 px-6 min-h-screen flex items-center"
        >
          {/* Subtle background particles (NOT the 3D shape — that lives in the right column) */}
          <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none">
            <canvas id="bg-particles" className="w-full h-full" />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-sm">stars</span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  New: Team Workouts
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight mb-8"
              >
                Build habits <br />
                that{' '}
                <span className="text-primary italic relative">
                  stick
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-primary/20 -z-10"
                  />
                </span>
                , together.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed"
              >
                Join 10,000+ people mastering their daily routines through
                community-driven challenges and real-time accountability.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-background-dark px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary/20 w-full sm:w-auto"
                  >
                    Start Your First Challenge
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-white/5 border border-primary/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">play_circle</span>{' '}
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* 3D Spinning Shape — the hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              {/* Outer glow ring */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute w-[280px] h-[280px] rounded-full bg-emerald-300/15 blur-2xl" />

              {/* The 3D canvas — big and prominent */}
              <div className="relative w-[440px] h-[440px] max-w-full">
                <Scene3D color="#4ade80" size={440} />
              </div>

              {/* Floating badge — streak */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 border border-primary/20 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Current Streak</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">14 days 🔥</p>
                </div>
              </motion.div>

              {/* Floating badge — completion */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 border border-primary/20 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Today</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">4/5 done ✓</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Social Proof Strip */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 bg-white/50 dark:bg-white/5 border-y border-primary/5"
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6"
            >
              Trusted by 10,000+ members
            </motion.h4>
            <div className="flex items-center">
              <div className="flex -space-x-4">
                {avatars.map((avatar, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="size-14 rounded-full border-4 border-background-light bg-cover bg-center"
                    style={{ backgroundImage: `url(${avatar})` }}
                  />
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="size-14 rounded-full border-4 border-background-light bg-primary/20 text-primary flex items-center justify-center font-bold text-sm"
                >
                  +4k
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <section className="py-24 px-6 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Built for consistency.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                We've designed Momentum to help you stay motivated every single
                day through psychological triggers and social loops.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-10 rounded-lg border border-primary/5 hover:border-primary/20 transition-all group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="size-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-8"
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {feature.icon}
                    </span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-primary rounded-lg p-12 md:p-20 text-center text-background-dark relative overflow-hidden shadow-2xl shadow-primary/20"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-0 right-0 p-20 opacity-10"
            >
              <span className="material-symbols-outlined text-[300px]">
                bolt
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">
              Ready to master your routine?
            </h2>
            <p className="text-lg md:text-xl font-medium opacity-80 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Start your 14-day free trial today. Join our thriving community
              and build the future version of yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-background-dark text-white px-10 py-4 rounded-full text-lg font-bold"
                >
                  Join the Community
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-background-dark px-10 py-4 rounded-full text-lg font-bold"
              >
                View Pricing
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-primary/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg font-bold">
                  bolt
                </span>
              </div>
              <h2 className="text-lg font-black tracking-tight">Momentum</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm">
              The only community-driven platform designed specifically for
              high-impact habit formation and daily mastery.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <li>
                <Link className="hover:text-primary transition-colors" to="/challenges">
                  Challenges
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/integrations">
                  Integrations
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/success-stories">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/pricing">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <li>
                <Link className="hover:text-primary transition-colors" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/community">
                  Community
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © 2026 Momentum Habit Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* GitHub */}
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-slate-400 hover:text-primary transition-colors"
              href="https://github.com/SurajSingh9696"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </motion.a>
            {/* Contact / email */}
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-slate-400 hover:text-primary transition-colors"
              href="/contact"
              aria-label="Contact us"
            >
              <span className="material-symbols-outlined">alternate_email</span>
            </motion.a>
            {/* Community chat */}
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-slate-400 hover:text-primary transition-colors"
              href="/community"
              aria-label="Community"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
