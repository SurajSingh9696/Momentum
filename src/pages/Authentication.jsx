import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Wireframe3D from '../components/Wireframe3D';


const Authentication = () => {
  const { isDark, toggleTheme } = useTheme();
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 3D-style avatars using DiceBear "bottts" — each seed produces a unique robot/3D character
  const AVATAR_SEEDS = ['Nova', 'Orion', 'Pixel', 'Lyra', 'Zen', 'Atlas', 'Echo', 'Vega'];
  const AVATAR_STYLE = 'bottts-neutral';
  const avatars = AVATAR_SEEDS.map((seed, i) => ({
    url: `https://api.dicebear.com/7.x/${AVATAR_STYLE}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
    label: seed,
  }));



  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name) {
          setError('Please provide your name');
          setLoading(false);
          return;
        }
        result = await register(formData.name, formData.email, formData.password, avatars[selectedAvatar].url);
      }

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    <div
      className="relative flex items-center justify-center min-h-screen overflow-y-auto bg-gradient-to-br from-primary/20 via-transparent to-emerald-300/5 dark:from-primary/20 dark:to-emerald-400/10 py-4 px-0 sm:px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex w-full max-w-[1100px] min-h-0 bg-white dark:bg-zinc-900 overflow-hidden sm:rounded-2xl soft-shadow flex-col md:flex-row md:max-h-[calc(100vh-2rem)]"
      >
        {/* Left Side: Motivational Image/Quote */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full md:w-1/2 h-40 md:h-auto bg-primary/10 overflow-hidden flex items-center justify-center p-8"
        >
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
          {/* Main 3D shape — icosahedron */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[340px] h-[340px] opacity-80">
              <Wireframe3D shape="icosahedron" color="#4ade80" speed={1.0} />
            </div>
          </div>
          {/* Decorative cube — corner */}
          <div className="absolute bottom-4 left-4 w-20 h-20 opacity-50 pointer-events-none">
            <Wireframe3D shape="cube" color="#86efac" speed={1.5} />
          </div>
          {/* Decorative octahedron — top right */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-40 pointer-events-none">
            <Wireframe3D shape="octahedron" color="#a7f3d0" speed={2.0} />
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
        <div className="w-full md:w-1/2 flex flex-col justify-between p-5 sm:p-8 bg-white dark:bg-zinc-900 overflow-y-auto">
          {/* Top Logo/Branding */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.img
                src="/logo.png"
                alt="Momentum"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-zinc-800 dark:text-zinc-100">
                Momentum
              </span>
            </motion.div>

            <div className="flex items-center gap-2">
              {/* Back to Home */}
              <Link to="/">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span className="hidden sm:inline">Home</span>
                </motion.button>
              </Link>
              {/* Theme toggle */}
              <motion.button whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }} onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors">
                <span className="material-symbols-outlined dark:hidden">dark_mode</span>
                <span className="material-symbols-outlined hidden dark:block">light_mode</span>
              </motion.button>
            </div>
          </div>

          {/* Form Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                {isLogin ? 'Welcome back!' : 'Join Momentum'}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {isLogin
                  ? 'Sign in to continue your progress.'
                  : 'Create your account to start building better habits.'}
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <motion.div variants={itemVariants} className="space-y-2">
                  <label
                    className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl">
                      person
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 rounded-full border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 focus:border-primary focus:ring-primary/20 transition-all outline-none bg-zinc-50"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </motion.div>
                </motion.div>
              )}

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
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  {isLogin && (
                    <a
                      className="text-xs text-primary font-medium hover:underline"
                      href="#"
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-12 py-4 rounded-full border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 focus:border-primary focus:ring-primary/20 transition-all outline-none bg-zinc-50"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
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

              {!isLogin && (
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                    Pick your 3D avatar
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {avatars.map((avatar, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.12, rotateY: 12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedAvatar(index)}
                        className={`flex flex-col items-center gap-1 p-1.5 rounded-2xl border-2 overflow-hidden transition-all ${selectedAvatar === index
                          ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                          : 'border-zinc-100 dark:border-zinc-800 hover:border-primary/50'
                          }`}
                        type="button"
                        style={{ perspective: '400px' }}
                      >
                        <img src={avatar.url} alt={avatar.label} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                        <span className="text-[9px] font-semibold text-zinc-400">{avatar.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}


              <motion.div variants={itemVariants} className="pt-2 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-zinc-900 font-bold py-3 rounded-full shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="w-full bg-white dark:bg-transparent border-2 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold py-3 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  {isLogin ? 'Create Account' : 'Already have an account? Sign In'}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex justify-center gap-5 text-xs text-zinc-400"
          >
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms</a>
            <a className="hover:text-primary transition-colors" href="#">Help</a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Authentication;
