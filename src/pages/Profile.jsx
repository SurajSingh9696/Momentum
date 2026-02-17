import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MobileNav from '../components/MobileNav';

const Profile = () => {
  const { toggleTheme } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
  ];

  const stats = [
    { icon: 'local_fire_department', value: '12', label: 'Total Streaks' },
    { icon: 'task_alt', value: '8', label: 'Challenges Done' },
    { icon: 'calendar_today', value: '145', label: 'Days Active' },
  ];

  const achievements = [
    {
      icon: 'light_mode',
      color: 'amber',
      title: 'Early Bird',
      subtitle: '7-Day Streak',
    },
    { icon: 'star', color: 'blue', title: 'First Step', subtitle: 'Challenge #1' },
    {
      icon: 'diamond',
      color: 'purple',
      title: 'Perfect Week',
      subtitle: '100% Activity',
    },
    {
      icon: 'workspace_premium',
      color: 'emerald',
      title: 'Consistent',
      subtitle: '30 Days',
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-20 lg:pb-0">
      {/* Top Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-[1024px] mx-auto px-4 sm:px-8 py-6 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="bg-primary p-2 rounded-lg text-white"
          >
            <span className="material-symbols-outlined">bolt</span>
          </motion.div>
          <h1 className="text-xl font-bold tracking-tight">Momentum</h1>
        </Link>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500">
              notifications
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors dark:text-slate-300 text-slate-500"
          >
            <span className="material-symbols-outlined">dark_mode</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              settings
            </span>
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-[1024px] mx-auto px-4 sm:px-8">
        {/* Profile Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="relative group">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-1 bg-gradient-to-tr from-primary to-emerald-300 rounded-full blur opacity-25"
            />

            <div className="relative bg-white dark:bg-slate-900 rounded-full p-1">
              <motion.img
                whileHover={{ scale: 1.05 }}
                alt="Alex Johnson Profile Photo"
                className="w-32 h-32 rounded-full object-cover"
                src={avatars[selectedAvatar]}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-4 border-background-light dark:border-background-dark cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">
                verified
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Alex Johnson
            </h2>
            <p className="text-slate-500 font-medium">Member since Jan 2024</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-primary/20"
            >
              Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-50 transition-all"
            >
              Share Stats
            </motion.button>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary/10 dark:bg-primary/20 border-2 border-primary text-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  dashboard
                </span>
                Go to Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Avatar Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 text-center">
            Choose your Avatar
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedAvatar(index)}
                className={`relative cursor-pointer ${
                  selectedAvatar === index ? 'ring-4 ring-primary ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark' : ''
                } rounded-full`}
              >
                <img
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full object-cover"
                  src={avatar}
                />
                {selectedAvatar === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-0.5"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      check
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Row */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4"
              >
                <span className="material-symbols-outlined">{stat.icon}</span>
              </motion.div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white">
                {stat.value}
              </p>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                military_tech
              </span>
              Achievements
            </h3>
            <a
              className="text-primary text-sm font-semibold hover:underline"
              href="#"
            >
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {achievements.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                whileHover={{ y: -10, rotate: 5, scale: 1.05 }}
                className="flex flex-col items-center bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-full bg-${badge.color}-50 dark:bg-${badge.color}-900/20 flex items-center justify-center mb-4`}
                >
                  <span
                    className={`material-symbols-outlined text-${badge.color}-500 text-3xl`}
                  >
                    {badge.icon}
                  </span>
                </motion.div>
                <p className="text-sm font-bold text-slate-800 dark:text-white text-center">
                  {badge.title}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                  {badge.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Activity Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10 mb-12"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="size-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span className="material-symbols-outlined">trending_up</span>
            </motion.div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 dark:text-white">
                You're on a roll!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                You've reached 85% of your monthly goal. Keep it up!
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="bg-primary h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-400 text-xs">
            Momentum Dashboard © 2024. Keep moving forward.
          </p>
        </footer>
      </div>

      <MobileNav />
    </div>
  );
};

export default Profile;
