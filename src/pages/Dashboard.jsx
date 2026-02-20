import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Wireframe3D from '../components/Wireframe3D';
import TiltCard from '../components/TiltCard';

// ─── Add Habit Modal ─────────────────────────────────────────────────────────
const AddHabitModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({ title: '', description: '', icon: 'self_improvement', category: 'health' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const icons = ['self_improvement', 'water_drop', 'menu_book', 'fitness_center', 'bedtime', 'directions_run', 'restaurant', 'code', 'music_note', 'brush'];
    const categories = ['health', 'productivity', 'mindset', 'fitness', 'learning'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) { setError('Title is required'); return; }
        setLoading(true);
        try {
            const res = await api.post('/habits', form);
            onAdd(res.data.habit);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create habit');
        } finally { setLoading(false); }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">New Habit</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                        <span className="material-symbols-outlined text-slate-500">close</span>
                    </button>
                </div>
                {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Habit Name*</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="e.g. Morning Meditation" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                        <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Optional description" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Icon</label>
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
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize">
                            {categories.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                        </select>
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50 mt-2">
                        {loading ? 'Creating...' : 'Create Habit'}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ─── Circular progress ring ───────────────────────────────────────────────────
const ProgressRing = ({ value = 0, size = 80, stroke = 7, color = '#4ade80' }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-200 dark:text-slate-700" />
            <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeLinecap="round" strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: 'easeOut' }} />
        </svg>
    );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const [habits, setHabits] = useState([]);
    const [stats, setStats] = useState({ totalHabits: 0, completedToday: 0, totalStreak: 0, longestStreak: 0, completionRate: 0 });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState('');

    const greetingHour = new Date().getHours();
    const greeting = greetingHour < 12 ? 'Good Morning' : greetingHour < 17 ? 'Good Afternoon' : 'Good Evening';
    const firstName = user?.name?.split(' ')[0] || 'there';

    useEffect(() => { if (isAuthenticated) fetchData(); }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true); setError('');
        try {
            const [hRes, sRes] = await Promise.all([api.get('/habits'), api.get('/habits/stats')]);
            setHabits(hRes.data.habits || []);
            setStats(sRes.data.stats || {});
        } catch { setError('Failed to load habits. Is the backend running?'); }
        finally { setLoading(false); }
    };

    const toggleHabit = async (habit) => {
        setHabits(prev => prev.map(h => h._id === habit._id ? { ...h, completed: !h.completed } : h));
        try {
            const res = await api.put(`/habits/${habit._id}`, { completed: !habit.completed });
            setHabits(prev => prev.map(h => h._id === habit._id ? res.data.habit : h));
            const sRes = await api.get('/habits/stats'); setStats(sRes.data.stats);
        } catch { setHabits(prev => prev.map(h => h._id === habit._id ? habit : h)); }
    };

    const deleteHabit = async (id) => {
        setDeletingId(id);
        try {
            await api.delete(`/habits/${id}`);
            setHabits(prev => prev.filter(h => h._id !== id));
            const sRes = await api.get('/habits/stats'); setStats(sRes.data.stats);
        } catch { setError('Failed to delete'); } finally { setDeletingId(null); }
    };

    const completionRate = stats.completionRate || 0;
    const statCards = [
        { icon: 'local_fire_department', value: stats.longestStreak || 0, label: 'Best Streak', sub: 'days', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-100 dark:border-orange-900/30' },
        { icon: 'task_alt', value: stats.completedToday || 0, label: 'Done Today', sub: `of ${stats.totalHabits}`, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/10' },
        { icon: 'trending_up', value: stats.totalStreak || 0, label: 'Current Streak', sub: 'days', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-900/30' },
        { icon: 'calendar_today', value: stats.totalHabits || 0, label: 'Total Habits', sub: 'active', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-900/30' },
    ];

    if (!isAuthenticated) return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-4">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none">
                <div className="w-full max-w-lg h-[500px]"><Wireframe3D shape="sphere" color="#4ade80" speed={0.5} /></div>
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center">
                <span className="material-symbols-outlined text-6xl text-primary mb-4 block">lock</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign in to see your Dashboard</h2>
                <p className="text-slate-500 mb-6">Track your habits, streaks and progress.</p>
                <Link to="/auth">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20">
                        Sign In / Register
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

            {/* ── Hero Banner ──────────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-slate-50 to-emerald-50 dark:from-primary/20 dark:via-slate-900 dark:to-slate-800 border border-primary/10 p-6 sm:p-8 min-h-[160px]">
                {/* Grid texture */}
                <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                    style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                {/* Glow orb */}
                <div className="absolute -top-10 -right-10 w-52 h-52 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                {/* 3D torus */}
                <div className="absolute right-0 top-0 bottom-0 w-52 sm:w-64 opacity-70 dark:opacity-50 pointer-events-none">
                    <Wireframe3D shape="torus" color="#4ade80" speed={1.0} />
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            {greeting}, {firstName} 👋
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
                            {completionRate > 0
                                ? `You've completed ${stats.completedToday} of ${stats.totalHabits} habits today — keep it up!`
                                : 'Start your day with a healthy habit.'}
                        </p>
                        {/* Mini progress pill */}
                        {stats.totalHabits > 0 && (
                            <div className="mt-3 flex items-center gap-2">
                                <div className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-primary rounded-full"
                                        initial={{ width: 0 }} animate={{ width: `${completionRate}%` }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }} />
                                </div>
                                <span className="text-xs font-bold text-primary">{completionRate}%</span>
                            </div>
                        )}
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 shrink-0 self-start sm:self-auto">
                        <span className="material-symbols-outlined">add</span>
                        New Habit
                    </motion.button>
                </div>
            </motion.div>

            {/* Error */}
            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-500">error</span>
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                    <button onClick={fetchData} className="ml-auto text-sm font-bold text-red-500 hover:underline">Retry</button>
                </motion.div>
            )}

            {/* ── Stat Cards with TiltCard ─────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {statCards.map((s, i) => (
                    <TiltCard key={i} intensity={12} scale={1.04}
                        className={`bg-white dark:bg-slate-800/60 border ${s.border} rounded-2xl p-5 text-center shadow-sm`}>
                        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.1, type: 'spring' }}>
                            <div className={`${s.bg} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>
                        </motion.div>
                    </TiltCard>
                ))}
            </motion.div>

            {/* ── Today's Progress Card + Habit List ───────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* Progress ring card */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                    <TiltCard intensity={10} scale={1.02}
                        className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-4 h-full min-h-[180px]">
                        <div className="relative flex items-center justify-center">
                            <ProgressRing value={completionRate} size={100} stroke={8} />
                            <div className="absolute text-center">
                                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">{completionRate}%</p>
                                <p className="text-[9px] text-slate-400 font-medium mt-0.5">done</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-800 dark:text-white text-sm">Today's Progress</p>
                            <p className="text-xs text-slate-400 mt-0.5">{stats.completedToday} of {stats.totalHabits} habits</p>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Habit list — takes 2/3 width */}
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">checklist</span>Today's Habits
                        </h2>
                        {habits.length > 0 && (
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {stats.completedToday}/{stats.totalHabits} done
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />)}</div>
                    ) : habits.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="relative overflow-hidden text-center py-14 bg-white dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
                                <div className="w-40 h-40"><Wireframe3D shape="octahedron" color="#4ade80" speed={0.7} /></div>
                            </div>
                            <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 block mb-3 relative z-10">add_task</span>
                            <p className="text-slate-500 font-medium mb-4 relative z-10">No habits yet. Create your first one!</p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)}
                                className="relative z-10 bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20">
                                + Add Habit
                            </motion.button>
                        </motion.div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden">
                            <AnimatePresence>
                                {habits.map((habit, index) => (
                                    <motion.div key={habit._id} layout
                                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                        className={`flex items-center gap-3.5 px-5 py-4 group transition-colors ${index < habits.length - 1 ? 'border-b border-slate-100 dark:border-slate-700/50' : ''} ${habit.completed ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>

                                        {/* Checkbox */}
                                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }} onClick={() => toggleHabit(habit)}
                                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${habit.completed ? 'bg-primary border-primary text-white shadow-md shadow-primary/30' : 'border-slate-300 dark:border-slate-600 hover:border-primary'}`}>
                                            <AnimatePresence>
                                                {habit.completed && (
                                                    <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
                                                        className="material-symbols-outlined text-sm font-bold">check</motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>

                                        {/* Icon */}
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${habit.completed ? 'bg-primary/15' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                            <span className={`material-symbols-outlined text-lg ${habit.completed ? 'text-primary' : 'text-slate-500'}`}>{habit.icon || 'task_alt'}</span>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold truncate text-sm transition-all ${habit.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>{habit.title}</p>
                                            <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
                                                {habit.streak > 0 && (
                                                    <span className="text-[11px] text-orange-500 font-bold flex items-center gap-0.5">
                                                        <span className="material-symbols-outlined text-[13px]">local_fire_department</span>{habit.streak}d
                                                    </span>
                                                )}
                                                {habit.category && (
                                                    <span className="text-[11px] text-slate-400 capitalize bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{habit.category}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Completed badge (right side) */}
                                        {habit.completed && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                className="shrink-0 hidden sm:flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                                                <span className="material-symbols-outlined text-[11px]">check_circle</span>Done
                                            </motion.div>
                                        )}

                                        {/* Delete */}
                                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }} onClick={() => deleteHabit(habit._id)} disabled={deletingId === habit._id}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all shrink-0">
                                            <span className={`material-symbols-outlined text-sm ${deletingId === habit._id ? 'animate-spin' : ''}`}>{deletingId === habit._id ? 'refresh' : 'delete'}</span>
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Quick add footer */}
                            <motion.button whileHover={{ backgroundColor: 'rgba(74,222,128,0.06)' }} onClick={() => setShowModal(true)}
                                className="w-full flex items-center gap-3 px-5 py-3.5 text-slate-400 hover:text-primary transition-colors border-t border-slate-100 dark:border-slate-700/50 text-sm font-semibold">
                                <span className="material-symbols-outlined text-lg">add_circle</span>Add another habit
                            </motion.button>
                        </div>
                    )}
                </motion.section>
            </div>

            {/* ── Quick Nav ────────────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mb-10">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">apps</span>Quick Access
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { to: '/challenges', icon: 'explore', label: 'Challenges', sub: 'Join & track', color: 'text-primary', bg: 'from-primary/15 to-emerald-50 dark:from-primary/20 dark:to-slate-900', border: 'border-primary/10', shape: 'octahedron' },
                        { to: '/community', icon: 'people', label: 'Community', sub: 'Share & support', color: 'text-blue-500', bg: 'from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-slate-900', border: 'border-blue-100 dark:border-blue-900/30', shape: 'sphere' },
                        { to: '/profile', icon: 'person', label: 'Profile', sub: 'Stats & settings', color: 'text-purple-500', bg: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-slate-900', border: 'border-purple-100 dark:border-purple-900/30', shape: 'cube' },
                        { to: '/', icon: 'home', label: 'Home', sub: 'Landing page', color: 'text-amber-500', bg: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-slate-900', border: 'border-amber-100 dark:border-amber-900/30', shape: 'icosahedron' },
                    ].map(item => (
                        <Link key={item.to} to={item.to}>
                            <TiltCard intensity={10} scale={1.03}
                                className={`relative overflow-hidden bg-gradient-to-br ${item.bg} border ${item.border} rounded-2xl p-5 flex flex-col gap-2 cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300`}>
                                {/* Mini 3D shape — corner decoration */}
                                <div className="absolute -right-5 -bottom-5 w-20 h-20 opacity-25 pointer-events-none">
                                    <Wireframe3D shape={item.shape} color="#4ade80" speed={0.7} />
                                </div>
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/60 dark:bg-white/10 backdrop-blur-sm shadow-sm`}>
                                    <span className={`material-symbols-outlined ${item.color} text-2xl`}>{item.icon}</span>
                                </div>
                                <div className="relative z-10">
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">{item.label}</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.sub}</p>
                                </div>
                            </TiltCard>
                        </Link>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {showModal && <AddHabitModal onClose={() => setShowModal(false)} onAdd={(h) => { setHabits(p => [h, ...p]); api.get('/habits/stats').then(r => setStats(r.data.stats)); }} />}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
