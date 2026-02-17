import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Authentication = () => {
  const { isDark, toggleTheme } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const avatars = [
    { icon: 'person', label: 'Default' },
    { icon: 'face', label: 'Happy' },
    { icon: 'sentiment_satisfied', label: 'Satisfied' },
    { icon: 'mood', label: 'Mood' },
    { icon: 'add', label: 'Custom' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-[1200px] h-full sm:h-[800px] bg-white dark:bg-zinc-900 overflow-hidden sm:rounded-xl soft-shadow flex-col md:flex-row"
      >
        {/* Left Side: Motivational Image/Quote */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full md:w-1/2 h-64 md:h-auto bg-primary/10 overflow-hidden flex items-center justify-center p-12"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              className="w-full h-full object-cover opacity-80 dark:opacity-40"
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop"
              alt="Calm nature scene"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
          </div>
          
          {/* Quote Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center max-w-sm"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-white/20 glass-panel rounded-full text-white"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md"
            >
              Every small step is a giant leap for your future self.
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="mt-8 h-1 w-16 bg-white/50 mx-auto rounded-full"
            ></motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 bg-white dark:bg-zinc-900">
          {/* Top Logo/Branding */}
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm font-bold">
                  trending_up
                </span>
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-800 dark:text-zinc-100">
                Momentum
              </span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            >
              <span className="material-symbols-outlined dark:hidden">
                dark_mode
              </span>
              <span className="material-symbols-outlined hidden dark:block">
                light_mode
              </span>
            </motion.button>
          </div>

          {/* Form Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                Welcome back!
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Ready to crush today's goals? Sign in to continue your progress.
              </p>
            </motion.div>

            <form className="space-y-5">
              <motion.div variants={itemVariants} className="space-y-2">
                <label
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl">
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 rounded-full border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 focus:border-primary focus:ring-primary/20 transition-all outline-none bg-zinc-50"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs text-primary font-medium hover:underline"
                    href="#"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-12 py-4 rounded-full border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 focus:border-primary focus:ring-primary/20 transition-all outline-none bg-zinc-50"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Select your avatar
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {avatars.map((avatar, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedAvatar(index)}
                      className={`aspect-square rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedAvatar === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:border-primary/50'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {avatar.icon}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4 flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary hover:bg-primary/90 text-zinc-900 font-bold py-4 rounded-full shadow-lg shadow-primary/20 transition-all"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white dark:bg-transparent border-2 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold py-4 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  Create Account
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="flex items-center my-8">
              <div className="flex-1 h-[1px] bg-zinc-100 dark:bg-zinc-800"></div>
              <span className="px-4 text-xs text-zinc-400 uppercase tracking-widest font-medium">
                Or
              </span>
              <div className="flex-1 h-[1px] bg-zinc-100 dark:bg-zinc-800"></div>
            </motion.div>

            {/* Guest Login */}
            <motion.button
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="text-zinc-500 dark:text-zinc-400 text-sm font-medium hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              Continue as Guest
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center gap-6 text-xs text-zinc-400"
          >
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Help Center
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Authentication;
