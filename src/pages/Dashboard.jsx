import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MobileNav from '../components/MobileNav';

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Drink 2L Water', completed: false },
    { id: 2, text: '10-min Daily Stretch', completed: false },
    { id: 3, text: 'Morning Journaling', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const streaks = [
    { id: 1, icon: 'self_improvement', name: 'Meditation', days: 12, progress: 85 },
    { id: 2, icon: 'menu_book', name: 'Reading', days: 5, progress: 40 },
    { id: 3, icon: 'water_drop', name: 'Hydration', days: 20, progress: 95 },
  ];

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10"
      >
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-primary p-2 rounded-lg flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-white text-2xl">
                bolt
              </span>
            </motion.div>
            <h1 className="text-xl font-bold tracking-tight">Momentum</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/dashboard"
              className="text-primary font-semibold text-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/challenges"
              className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium text-sm"
            >
              Challenges
            </Link>
            <Link
              to="/community"
              className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium text-sm"
            >
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined dark:hidden">
                light_mode
              </span>
              <span className="material-symbols-outlined hidden dark:block">
                dark_mode
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-slate-400 hover:text-primary transition-colors relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </motion.button>

            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-10 w-10 rounded-full bg-primary/20 overflow-hidden border-2 border-primary/10 cursor-pointer"
              >
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Greeting Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Good Morning, Alex 👋
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-lg font-medium"
          >
            You've completed {completionPercentage}% of your goals this week.
          </motion.p>
        </motion.section>

        {/* Today's Focus Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-14"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Today's Focus
            </h3>
            <motion.span
              key={totalTasks - completedTasks}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-semibold text-primary"
            >
              {totalTasks - completedTasks} Tasks Left
            </motion.span>
          </div>

          <motion.div
            layout
            className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.label
                    key={task.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ backgroundColor: 'rgba(74, 222, 128, 0.05)' }}
                    className="flex items-center gap-4 p-5 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-6 h-6 rounded-full border-2 border-slate-200 dark:border-slate-600 text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    <span
                      className={`font-medium group-hover:text-primary transition-colors ${
                        task.completed
                          ? 'line-through text-slate-400'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {task.text}
                    </span>
                    {task.completed && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="ml-auto text-primary"
                      >
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                      </motion.span>
                    )}
                  </motion.label>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        {/* Your Streaks Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-14"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Your Streaks
          </h3>
          <div className="grid gap-4">
            {streaks.map((streak, index) => (
              <motion.div
                key={streak.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="material-symbols-outlined text-primary"
                    >
                      {streak.icon}
                    </motion.span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {streak.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <motion.span
                      key={streak.days}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-black text-lg"
                    >
                      {streak.days}
                    </motion.span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Days
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${streak.progress}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Motivation Footer Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-24"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6 text-center"
          >
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              You're doing great!{' '}
              <span className="text-primary font-bold">
                {totalTasks - completedTasks} more habits
              </span>{' '}
              to complete your daily streak and earn today's badge.
            </p>
          </motion.div>
        </motion.section>
      </main>

      {/* Fixed Floating Action Button */}
      <motion.div
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        className="fixed bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary text-slate-900 font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl flex items-center gap-3 animate-glow"
        >
          <span className="material-symbols-outlined font-bold">add</span>
          Update Progress
        </motion.button>
      </motion.div>

      <MobileNav />
    </div>
  );
};

export default Dashboard;
