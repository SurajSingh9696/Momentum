import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Wireframe3D from '../components/Wireframe3D';
import TiltCard from '../components/TiltCard';


// ─── Create Challenge Modal ───────────────────────────────────────────────────
const CreateChallengeModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({ title: '', description: '', icon: 'emoji_events', category: 'health', difficulty: 'medium', duration: 30, maxParticipants: 100 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const icons = ['emoji_events', 'fitness_center', 'self_improvement', 'menu_book', 'directions_run', 'water_drop', 'code', 'bedtime'];
  const categories = ['fitness', 'mindfulness', 'productivity', 'social', 'learning', 'health'];
  const difficulties = ['easy', 'medium', 'hard'];
  const presets = [
    { label: '7 Day Kickstart', duration: 7, maxParticipants: 30, difficulty: 'easy' },
    { label: '30 Day Standard', duration: 30, maxParticipants: 100, difficulty: 'medium' },
    { label: '90 Day Deep Focus', duration: 90, maxParticipants: 300, difficulty: 'hard' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Challenge title is required.');
      return;
    }
    if (!form.description.trim()) {
      setError('Challenge description is required.');
      return;
    }
    if (Number.isNaN(form.duration) || form.duration < 1 || form.duration > 365) {
      setError('Duration must be between 1 and 365 days.');
      return;
    }
    if (Number.isNaN(form.maxParticipants) || form.maxParticipants < 2 || form.maxParticipants > 10000) {
      setError('Max participants must be between 2 and 10000.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
      };
      const res = await api.post('/challenges', payload);
      onCreate(res.data.challenge);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to create challenge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create Challenge</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Define a clear goal so others can join quickly.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>
        {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Quick Templates</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setForm({ ...form, duration: preset.duration, maxParticipants: preset.maxParticipants, difficulty: preset.difficulty })}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Title*</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value.slice(0, 80) })} required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 30 Day Running Challenge" />
            <p className="mt-1 text-[11px] text-slate-400">{form.title.length}/80</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description*</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value.slice(0, 240) })} required rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Describe your challenge..." />
            <p className="mt-1 text-[11px] text-slate-400">{form.description.length}/240</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category*</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize">
                {categories.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize">
                {difficulties.map((d) => <option key={d} value={d} className="capitalize">{d}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Duration (days)*</label>
              <input type="number" min="1" max="365" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Max Participants</label>
              <input type="number" min="2" max="10000" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: Number(e.target.value) })}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Icon</label>
            <div className="flex flex-wrap gap-2">
              {icons.map((icon) => (
                <motion.button key={icon} type="button" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setForm({ ...form, icon })}
                  className={`p-2.5 rounded-xl border-2 transition-all ${form.icon === icon ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                  <span className="material-symbols-outlined text-lg">{icon}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
            className="w-full bg-primary text-background-dark py-3 rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Challenge'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Challenges Page ──────────────────────────────────────────────────────────
const CATEGORY_IMAGES = {
  fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  mindfulness: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  productivity: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
  social: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
  learning: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
  health: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
};

const Challenges = () => {
  const { isAuthenticated, user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joiningId, setJoiningId] = useState(null);
  const [likingId, setLikingId] = useState(null);
  const [wishlistingId, setWishlistingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'mindfulness', label: 'Mindfulness' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'health', label: 'Health' },
    { id: 'learning', label: 'Learning' },
  ];

  useEffect(() => { fetchChallenges(); }, []);

  const fetchChallenges = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/challenges');
      setChallenges(res.data.challenges || []);
    } catch (err) {
      setError('Failed to load challenges. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinLeave = async (challenge) => {
    if (!isAuthenticated) { window.location.href = '/auth'; return; }
    const isJoined = challenge.participants?.some((p) => p === user?.id || p?._id === user?.id || p?.toString() === user?.id);
    setJoiningId(challenge._id);
    try {
      const endpoint = isJoined ? `/challenges/${challenge._id}/leave` : `/challenges/${challenge._id}/join`;
      await api.post(endpoint);
      await fetchChallenges();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setJoiningId(null);
    }
  };

  const isUserJoined = (challenge) => {
    if (!user) return false;
    return challenge.participants?.some((p) => p === user?.id || p?._id === user?.id || p?.toString() === user?.id);
  };

  const isUserLiked = (challenge) => {
    if (!user) return false;
    return challenge.likes?.some((p) => p === user?.id || p?._id === user?.id || p?.toString() === user?.id);
  };

  const isUserWishlisted = (challenge) => {
    if (!user) return false;
    return challenge.wishlisted?.some((p) => p === user?.id || p?._id === user?.id || p?.toString() === user?.id);
  };

  const handleLike = async (challenge) => {
    if (!isAuthenticated) { window.location.href = '/auth'; return; }
    setLikingId(challenge._id);
    try {
      const res = await api.post(`/challenges/${challenge._id}/like`);
      setChallenges((prev) => prev.map((c) => c._id === challenge._id ? res.data.challenge : c));
    } catch (err) {
      /* ignore */
    } finally {
      setLikingId(null);
    }
  };

  const handleWishlist = async (challenge) => {
    if (!isAuthenticated) { window.location.href = '/auth'; return; }
    setWishlistingId(challenge._id);
    try {
      const res = await api.post(`/challenges/${challenge._id}/wishlist`);
      setChallenges((prev) => prev.map((c) => c._id === challenge._id ? res.data.challenge : c));
    } catch (err) {
      /* ignore */
    } finally {
      setWishlistingId(null);
    }
  };

  const filtered = selectedCategory === 'all'
    ? challenges
    : challenges.filter((c) => c.category === selectedCategory);

  const difficultyColor = { easy: 'text-green-500 bg-green-50 dark:bg-green-900/20', medium: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20', hard: 'text-red-500 bg-red-50 dark:bg-red-900/20' };


  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      {/* 3D Hero Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-slate-50 to-emerald-50 dark:from-primary/20 dark:via-slate-900 dark:to-slate-800 border border-primary/10 p-6 sm:p-8 min-h-[180px]">
        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow orb */}
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        {/* 3D Octahedron */}
        <div className="absolute right-0 top-0 bottom-0 w-56 sm:w-64 opacity-80 dark:opacity-60 pointer-events-none">
          <Wireframe3D shape="octahedron" color="#4ade80" speed={1.4} />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">explore</span>Community Challenges
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Explore Challenges</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Join the community and build better habits together.</p>
            {/* Mini stats */}
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full inline-block animate-pulse" />
                {challenges.length} challenges live
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                {challenges.reduce((a, c) => a + (c.participants?.length || 0), 0)} participants
              </span>
            </div>
          </div>
          {isAuthenticated && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 shrink-0 self-start sm:self-auto">
              <span className="material-symbols-outlined">add</span>
              Create Challenge
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
          <button onClick={fetchChallenges} className="ml-auto text-sm font-bold text-red-500 hover:underline">Retry</button>
        </div>
      )}


      {/* Category Filter */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button key={cat.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id
              ? 'bg-primary text-white shadow-md shadow-primary/20'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary/40'
              }`}>
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Challenges Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 block mb-4">explore</span>
          <p className="text-slate-500 text-lg font-medium">
            {challenges.length === 0 ? 'No challenges yet. Be the first to create one!' : 'No challenges in this category.'}
          </p>
          {isAuthenticated && challenges.length === 0 && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="mt-4 bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20">
              + Create First Challenge
            </motion.button>
          )}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((challenge, index) => {
              const joined = isUserJoined(challenge);
              const imgSrc = CATEGORY_IMAGES[challenge.category] || CATEGORY_IMAGES.health;

              return (
                <TiltCard key={challenge._id} intensity={8} scale={1.02}
                  className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 overflow-hidden">

                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${imgSrc})` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </motion.div>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider capitalize">{challenge.category}</span>
                      {challenge.difficulty && (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider capitalize backdrop-blur-sm ${difficultyColor[challenge.difficulty] || 'text-slate-500 bg-white/80'}`}>
                          {challenge.difficulty}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">group</span>
                      {challenge.participants?.length || 0}
                    </div>
                    {joined && (
                      <div className="absolute bottom-3 right-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                        Joined
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">{challenge.icon || 'emoji_events'}</span>
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-snug">{challenge.title}</h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{challenge.description}</p>

                    {/* Stats row — visible to everyone */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>{challenge.duration} days
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                        {challenge.participants?.length || 0} joined
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <span className="material-symbols-outlined text-[14px] text-rose-400">favorite</span>
                        {challenge.likes?.length || 0}
                      </span>
                    </div>

                    {/* Action row */}
                    <div className="flex gap-2">
                      {/* Join/Leave */}
                      <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        onClick={() => handleJoinLeave(challenge)}
                        disabled={joiningId === challenge._id}
                        className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-1.5 ${joined
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800 hover:bg-red-100'
                          : 'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90'
                          } disabled:opacity-50`}>
                        {joiningId === challenge._id
                          ? <><span className="material-symbols-outlined text-sm animate-spin">refresh</span> Processing...</>
                          : joined
                            ? <><span className="material-symbols-outlined text-sm">logout</span> Leave</>
                            : <><span className="material-symbols-outlined text-sm">add_circle</span> Join</>
                        }
                      </motion.button>

                      {/* Like button */}
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }}
                        onClick={() => handleLike(challenge)}
                        disabled={likingId === challenge._id}
                        title={isAuthenticated ? (isUserLiked(challenge) ? 'Unlike' : 'Like') : 'Sign in to like'}
                        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all disabled:opacity-50 ${isUserLiked(challenge)
                          ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-500'
                          : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 hover:border-rose-300 hover:text-rose-400'
                          }`}>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isUserLiked(challenge) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                      </motion.button>

                      {/* Wishlist button */}
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }}
                        onClick={() => handleWishlist(challenge)}
                        disabled={wishlistingId === challenge._id}
                        title={isAuthenticated ? (isUserWishlisted(challenge) ? 'Remove from wishlist' : 'Save to wishlist') : 'Sign in to save'}
                        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all disabled:opacity-50 ${isUserWishlisted(challenge)
                          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-500'
                          : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 hover:border-amber-300 hover:text-amber-400'
                          }`}>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isUserWishlisted(challenge) ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                      </motion.button>
                    </div>
                  </div>

                </TiltCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && <CreateChallengeModal onClose={() => setShowModal(false)} onCreate={(c) => setChallenges((prev) => [c, ...prev])} />}
      </AnimatePresence>
    </main>
  );
};

export default Challenges;
