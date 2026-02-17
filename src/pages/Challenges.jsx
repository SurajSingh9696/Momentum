import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Challenges = () => {
  const { toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'health', label: 'Health' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'mindset', label: 'Mindset' },
  ];

  const challenges = [
    {
      id: 1,
      category: 'health',
      title: '30 Days of Morning Yoga',
      description:
        'A beginner-friendly flow designed to wake up your body and focus your mind for the day ahead.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      participants: 1200,
      progress: 65,
      joined: true,
      color: 'primary',
    },
    {
      id: 2,
      category: 'productivity',
      title: 'Deep Work Sprint',
      description:
        'Master your focus with daily 45-minute distraction-free blocks. Perfect for complex projects.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
      participants: 850,
      progress: 0,
      joined: false,
      color: 'orange',
    },
    {
      id: 3,
      category: 'mindset',
      title: 'Gratitude Journaling',
      description:
        'Five minutes of daily reflection to rewire your brain for positivity and long-term well-being.',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
      participants: 2100,
      progress: 0,
      joined: false,
      color: 'purple',
    },
    {
      id: 4,
      category: 'health',
      title: 'Strength Foundations',
      description:
        'Build a solid base with bodyweight movements. No equipment needed, just your dedication.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      participants: 540,
      progress: 0,
      joined: false,
      color: 'primary',
    },
    {
      id: 5,
      category: 'productivity',
      title: 'Inbox Zero Mastery',
      description:
        'Clean up your digital life. Strategies to process emails quickly and reduce digital clutter.',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800',
      participants: 2800,
      progress: 12,
      joined: true,
      color: 'orange',
    },
  ];

  const filteredChallenges =
    selectedCategory === 'all'
      ? challenges
      : challenges.filter((c) => c.category === selectedCategory);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Top Navigation Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-white">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="size-8 bg-primary rounded-lg flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined">bolt</span>
            </motion.div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">
              Momentum
            </h2>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/challenges"
              className="text-primary text-sm font-semibold leading-normal"
            >
              Explore
            </Link>
            <Link
              to="/dashboard"
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium leading-normal"
            >
                Dashboard
            </Link>
            <Link
              to="/community"
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium leading-normal"
            >
              Community
            </Link>
            <Link
              to="/profile"
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium leading-normal"
            >
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 justify-end gap-6 items-center">
          <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-full h-full bg-primary/10 overflow-hidden">
              <div className="text-primary flex items-center justify-center pl-4">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-primary/60 px-2 text-sm font-normal"
                placeholder="Search challenges..."
              />
            </div>
          </label>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="size-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all"
            title="Toggle theme"
          >
            <span className="material-symbols-outlined text-[24px]">
              light_mode
            </span>
          </motion.button>

          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3"
            >
              <div className="size-10 rounded-full border-2 border-primary/20 p-0.5">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400")',
                  }}
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      <main className="flex flex-1 justify-center py-10 px-6 md:px-20">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
          {/* Hero/Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 mb-8"
          >
            <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Explore Challenges
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-normal max-w-2xl">
              Small steps lead to big changes. Join thousands of people building
              better habits together.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="flex p-1 bg-white dark:bg-slate-800 border border-primary/10 rounded-full w-fit shadow-sm">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all relative ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-primary/5'
                  }`}
                >
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-primary rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <span>Sort by:</span>
              <button className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                Popular{' '}
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>
            </div>
          </motion.div>

          {/* Challenge Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                      style={{ backgroundImage: `url(${challenge.image})` }}
                    />
                    <div
                      className={`absolute top-4 left-4 bg-${challenge.color === 'primary' ? 'primary' : challenge.color === 'orange' ? 'orange' : 'purple'}-400/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
                    >
                      {challenge.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        group
                      </span>{' '}
                      {challenge.participants}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed mb-6">
                      {challenge.description}
                    </p>

                    <div className="mt-auto">
                      {challenge.joined ? (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-primary">
                              Progress
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {challenge.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-primary/10 h-2 rounded-full mb-6 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${challenge.progress}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                              className="bg-primary h-full rounded-full"
                            />
                          </div>
                          <Link to="/dashboard">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-primary/10 hover:bg-primary/20 text-slate-900 dark:text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                            >
                              <span className="material-symbols-outlined text-lg">
                                visibility
                              </span>
                              View Progress
                            </motion.button>
                          </Link>
                        </>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-full shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-lg">
                            add_circle
                          </span>
                          Join Challenge
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Create Challenge Card */}
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col bg-primary/10 rounded-xl border-2 border-dashed border-primary/30 items-center justify-center p-8 text-center gap-4 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="size-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl">
                    psychology
                  </span>
                </motion.div>
                <div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                    Have a better idea?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-normal mt-1">
                    Create your own challenge and invite the community to join
                    you.
                  </p>
                </div>
                <button className="mt-4 px-8 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-900 dark:text-white font-bold rounded-full transition-all border border-primary/20">
                  Create Challenge
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex justify-center items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="size-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </motion.button>
            <div className="flex gap-2">
              <button className="size-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                1
              </button>
              <button className="size-10 rounded-full hover:bg-primary/10 text-slate-600 dark:text-slate-400 font-bold flex items-center justify-center transition-colors">
                2
              </button>
              <button className="size-10 rounded-full hover:bg-primary/10 text-slate-600 dark:text-slate-400 font-bold flex items-center justify-center transition-colors">
                3
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="size-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-primary/10 py-8 px-6 md:px-20 mt-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-bold">
                Tip of the day
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Consistency is more important than intensity. Keep showing up!
              </p>
            </div>
          </div>
          <div className="flex gap-8 text-slate-600 dark:text-slate-400 text-xs font-medium">
            <a
              className="hover:text-primary transition-colors uppercase tracking-widest"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-primary transition-colors uppercase tracking-widest"
              href="#"
            >
              Help Center
            </a>
            <a
              className="hover:text-primary transition-colors uppercase tracking-widest"
              href="#"
            >
              Discord Community
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Challenges;
