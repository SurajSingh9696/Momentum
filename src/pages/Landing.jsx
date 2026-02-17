import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Scene3D from '../components/Scene3D';

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
          {/* 3D Background */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <Scene3D />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

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

            {/* Dashboard Preview Card */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative z-10 w-full max-w-[500px] ml-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 border border-primary/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">My Routine</h3>
                  <span className="material-symbols-outlined text-primary">
                    calendar_month
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: 'water_drop', color: 'primary', progress: 75, label: 'Drink 2L Water' },
                    { icon: 'fitness_center', color: 'orange', progress: 40, label: 'Morning Run • 4/10 km' },
                    { icon: 'check', color: 'primary', progress: 100, label: 'Read 20 Pages • Completed', completed: true },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 bg-background-light dark:bg-slate-700 rounded-lg ${
                        item.completed ? 'border-2 border-primary' : ''
                      }`}
                    >
                      <div
                        className={`w-10 h-10 ${
                          item.color === 'primary'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-orange-400/20 text-orange-400'
                        } ${
                          item.completed ? 'bg-primary text-white' : ''
                        } rounded-full flex items-center justify-center`}
                      >
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ delay: 1 + index * 0.1, duration: 1 }}
                            className={`h-full ${
                              item.color === 'primary'
                                ? 'bg-primary'
                                : 'bg-orange-400'
                            }`}
                          />
                        </div>
                        <p className="text-xs font-medium opacity-70">
                          {item.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
              />
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
                <a className="hover:text-primary transition-colors" href="#">
                  Challenges
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Integrations
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Success Stories
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Community
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © 2024 Momentum Habit Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              className="text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              className="text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
            <a
              className="text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
