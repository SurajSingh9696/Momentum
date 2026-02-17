import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MobileNav from '../components/MobileNav';

const Community = () => {
  const { toggleTheme } = useTheme();
  const [likedPosts, setLikedPosts] = useState([]);

  const posts = [
    {
      id: 1,
      author: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      time: '2 hours ago',
      badge: 'Daily Win',
      content:
        "Just finished my 10th day of meditation! 🧘‍♀️ Feeling more focused and calm than ever before.",
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      likes: 24,
      comments: 8,
      streak: 10,
    },
    {
      id: 2,
      author: 'Alex Rivers',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      time: '4 hours ago',
      badge: 'New Milestone',
      badgeColor: 'blue',
      content:
        "Crushed my 5km personal best this morning! 🏃‍♂️ 22:45. Feeling like a machine today.",
      likes: 0,
      comments: 0,
    },
  ];

  const contributors = [
    {
      name: 'Elena Woods',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      momentum: '2.4k',
      rank: 1,
    },
    {
      name: 'Mark Zhang',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      momentum: '1.8k',
      rank: 2,
    },
    {
      name: 'James Cole',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      momentum: '1.5k',
      rank: 3,
    },
  ];

  const trendingChallenges = [
    { name: 'Early Bird Club', participants: 420, progress: 70 },
    { name: 'Mindful Meditation', participants: 1200, progress: 45 },
    { name: '100 Days of Code', participants: 890, progress: 85 },
  ];

  const toggleLike = (postId) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Top Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 md:px-10 py-3"
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-primary p-1.5 rounded-lg flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-white text-xl">
                  rocket_launch
                </span>
              </motion.div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                Momentum
              </h2>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/community"
                className="text-sm font-semibold text-primary"
              >
                Feed
              </Link>
              <Link
                to="/challenges"
                className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
              >
                Challenges
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden sm:block px-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                placeholder="Search community..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined dark:hidden">
                dark_mode
              </span>
              <span className="material-symbols-outlined hidden dark:block">
                light_mode
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </motion.button>

            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-primary/20 cursor-pointer"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                  alt="User profile avatar"
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 py-8">
        {/* Left Navigation (Hidden on Mobile) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <nav className="space-y-1">
            <Link
              to="/community"
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-primary/10 text-primary font-semibold"
            >
              <span className="material-symbols-outlined filled-icon">
                home
              </span>
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-colors"
            >
              <span className="material-symbols-outlined">trending_up</span>
              <span>My Progress</span>
            </Link>
            <Link
              to="/challenges"
              className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-colors"
            >
              <span className="material-symbols-outlined">emoji_events</span>
              <span>Challenges</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-colors"
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </Link>
          </nav>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-primary/5 rounded-3xl border border-primary/10"
          >
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">
              Momentum Streak
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="material-symbols-outlined text-primary text-3xl"
              >
                local_fire_department
              </motion.span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                12
              </span>
              <span className="text-sm font-medium text-slate-500">Days</span>
            </div>
            <button className="w-full py-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-all">
              View Details
            </button>
          </motion.div>
        </aside>

        {/* Main Feed */}
        <section className="lg:col-span-6 space-y-6">
          {/* Create Post Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-white/5 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-white/10"
          >
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                  alt="Current user avatar"
                />
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full min-h-[60px] bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-400 resize-none font-medium"
                  placeholder="What's your win for today?"
                />
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50 dark:border-white/5">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">image</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        sentiment_satisfied
                      </span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        bar_chart
                      </span>
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-primary/20"
                  >
                    Share Update
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feed Header */}
          <div className="flex items-center justify-between px-2">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Recent Activity
            </h1>
            <button className="text-sm font-semibold text-primary flex items-center gap-1">
              <span>Newest First</span>
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>

          {/* Post Cards */}
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ borderColor: 'rgba(74, 222, 128, 0.3)' }}
                className="bg-white dark:bg-white/5 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/10"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={post.avatar}
                          alt={`${post.author} avatar`}
                        />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {post.author}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {post.time}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        post.badgeColor === 'blue'
                          ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'bg-primary/10 text-primary'
                      } text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}
                    >
                      {post.badge}
                    </div>
                  </div>

                  <p className="text-xl font-semibold leading-relaxed text-slate-800 dark:text-slate-200 mb-6">
                    {post.content}
                  </p>

                  {post.image && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl overflow-hidden aspect-video relative group mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <img
                        className="w-full h-full object-cover"
                        src={post.image}
                        alt="Post content"
                      />
                      {post.streak && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold">
                            STREAK: {post.streak} DAYS
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-white/5">
                    <div className="flex items-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={`p-2 rounded-full transition-all ${
                            likedPosts.includes(post.id)
                              ? 'bg-primary/10 text-primary'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-primary group-hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined filled-icon">
                            favorite
                          </span>
                        </div>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                          {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 group text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
                      >
                        <span className="material-symbols-outlined">
                          chat_bubble
                        </span>
                        <span className="text-sm font-bold">
                          {post.comments} Cheers
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          {/* Top Contributors */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/10"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Top Contributors
            </h3>
            <div className="space-y-4">
              {contributors.map((contributor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={contributor.avatar}
                        alt={contributor.name}
                      />
                      {contributor.rank === 1 && (
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[8px] text-white">
                            star
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-slate-800 dark:text-white">
                        {contributor.name}
                      </p>
                      <p className="text-xs text-primary font-bold">
                        {contributor.momentum} Momentum
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-300">
                    #{contributor.rank}
                  </span>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
              View Leaderboard
            </button>
          </motion.div>

          {/* Trending Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/10"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Trending Challenges
            </h3>
            <div className="space-y-4">
              {trendingChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                      {challenge.name}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400">
                      {challenge.participants} participants
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 1 }}
                      className="bg-primary h-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/challenges">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-2 bg-primary/10 text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Browse Challenges
              </motion.button>
            </Link>
          </motion.div>
        </aside>
      </main>

      <MobileNav />
    </div>
  );
};

export default Community;
