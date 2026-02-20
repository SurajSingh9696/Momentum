import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ transparent = false }) => {
  const { toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/challenges', label: 'Challenges', icon: 'explore' },
    { path: '/community', label: 'Community', icon: 'people' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`sticky top-0 z-50 w-full border-b border-primary/10 ${transparent
        ? 'bg-background-light/80 dark:bg-background-dark/80'
        : 'bg-white/90 dark:bg-background-dark/90'
        } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.img
            src="/logo.png"
            alt="Momentum"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-lg object-contain"
          />
          <h2 className="text-lg font-black tracking-tight dark:text-white group-hover:text-primary transition-colors">
            Momentum
          </h2>
        </Link>

        {/* Desktop Nav — always visible */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <motion.div
                whileHover={{ y: -1 }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive(link.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined text-base">{link.icon}</span>
                {link.label}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-500 dark:text-slate-400 hover:text-primary"
          >
            <span className="material-symbols-outlined dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block text-primary">light_mode</span>
          </motion.button>

          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:border-primary/40 transition-all cursor-pointer"
                >
                  <div className="h-7 w-7 rounded-full overflow-hidden border border-primary/30 flex-shrink-0 bg-primary/20">
                    <img
                      alt={user?.name}
                      className="w-full h-full object-cover"
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'user')}`}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 pr-1 hidden sm:block max-w-[90px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-bold hover:bg-primary/10 rounded-full transition-all text-slate-600 dark:text-slate-300"
              >
                Sign In
              </Link>
              <Link to="/auth">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20"
                >
                  Get Started
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
