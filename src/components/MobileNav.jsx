import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: 'home', label: 'Home' },
    { path: '/challenges', icon: 'explore', label: 'Explore' },
    { path: '/community', icon: 'emoji_events', label: 'Community' },
    { path: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-white/10 px-6 py-3 z-50"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`p-2 ${
                  isActive ? 'text-primary' : 'text-slate-400'
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive ? 'filled-icon' : ''
                  }`}
                >
                  {item.icon}
                </span>
              </motion.button>
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileNav;
