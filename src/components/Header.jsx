import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header = ({ transparent = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`sticky top-0 z-50 w-full border-b border-primary/10 ${
        transparent
          ? 'bg-background-light/80 dark:bg-background-dark/80'
          : 'bg-white/80 dark:bg-background-dark/80'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="bg-primary p-1.5 rounded-lg flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-white text-2xl font-bold">
              bolt
            </span>
          </motion.div>
          <h2 className="text-xl font-black tracking-tight dark:text-white group-hover:text-primary transition-colors">
            Momentum
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            to="/challenges"
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            Challenges
          </Link>
          <Link
            to="/community"
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            Community
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-400 hover:text-primary"
          >
            <span className="material-symbols-outlined dark:hidden">
              dark_mode
            </span>
            <span className="material-symbols-outlined hidden dark:block text-primary">
              light_mode
            </span>
          </motion.button>
          <Link
            to="/auth"
            className="px-5 py-2 text-sm font-bold hover:bg-primary/10 rounded-full transition-all"
          >
            Sign In
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
