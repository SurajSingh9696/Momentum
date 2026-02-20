import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Wireframe3D from '../components/Wireframe3D';
import api from '../utils/api';

// ─── 3D Avatar seeds (matching Auth page) ─────────────────────────────────────
const AVATAR_SEEDS = ['Nova', 'Orion', 'Pixel', 'Lyra', 'Zen', 'Atlas', 'Echo', 'Vega'];
const AVATAR_STYLE = 'bottts-neutral';
const avatarUrl = (seed) =>
  `https://api.dicebear.com/7.x/${AVATAR_STYLE}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

// Pick the closest avatar from saved URL or default to first
const seedFromUrl = (url) => {
  if (!url) return AVATAR_SEEDS[0];
  const found = AVATAR_SEEDS.find((s) => url.includes(`seed=${s}`));
  return found || AVATAR_SEEDS[0];
};

// ─── Inline editable field ────────────────────────────────────────────────────
const EditableField = ({ label, icon, value, onSave, type = 'text' }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef();

  useEffect(() => { setVal(value); }, [value]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const handleSave = async () => {
    setSaving(true);
    await onSave(val);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-700 group">
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type={type}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-primary/50 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={saving}
              className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm shadow-primary/20 disabled:opacity-50">
              {saving ? '...' : 'Save'}
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditing(false); setVal(value); }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs font-bold rounded-lg">
              Cancel
            </motion.button>
          </div>
        ) : (
          <p className="font-semibold text-slate-800 dark:text-white">{value}</p>
        )}
      </div>
      {!editing && (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-300 text-lg">{icon}</span>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined text-sm">edit</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

// ─── Change Password Modal ────────────────────────────────────────────────────
const PasswordModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setSaving(true);
    setError('');
    const result = await onSave(form.currentPassword, form.newPassword);
    setSaving(false);
    if (result?.success) onClose();
    else setError(result?.message || 'Failed to update password');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Change Password</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <span className="material-symbols-outlined text-slate-400 text-lg">close</span>
          </button>
        </div>
        {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { field: 'currentPassword', label: 'Current Password', placeholder: '••••••••' },
            { field: 'newPassword', label: 'New Password', placeholder: 'Min. 6 characters' },
            { field: 'confirmPassword', label: 'Confirm New Password', placeholder: '••••••••' },
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
              <input type="password" value={form[field]} placeholder={placeholder}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            </div>
          ))}
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={saving}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50 mt-2">
            {saving ? 'Updating...' : 'Update Password'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Profile Component ───────────────────────────────────────────────────
const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalHabits: 0, completedToday: 0, totalStreak: 0, longestStreak: 0, completionRate: 0 });
  const [challengeCount, setChallengeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchProfileData();
  }, [isAuthenticated]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const [statsRes, challengesRes] = await Promise.all([
        api.get('/habits/stats'),
        api.get('/challenges/my'),
      ]);
      setStats(statsRes.data.stats || {});
      setChallengeCount(challengesRes.data.challenges?.length || 0);
    } catch { /* Non-critical */ } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async (name) => {
    const res = await updateProfile({ name: name.trim() });
    if (res?.success) showToast('Name updated ✓');
    else showToast(res?.message || 'Failed to update');
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    return await updateProfile({ currentPassword, newPassword });
  };

  const handleAvatarChange = async (seed) => {
    const url = avatarUrl(seed);
    const res = await updateProfile({ avatar: url });
    if (res?.success) { setShowAvatarPicker(false); showToast('Avatar updated ✓'); }
    else showToast(res?.message || 'Failed to update avatar');
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const currentSeed = seedFromUrl(user?.avatar);

  const statCards = [
    { icon: 'local_fire_department', value: stats.longestStreak || 0, label: 'Best Streak', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: 'task_alt', value: stats.totalHabits || 0, label: 'Total Habits', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: 'emoji_events', value: challengeCount, label: 'Challenges', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: 'percent', value: `${stats.completionRate || 0}%`, label: 'Completion Rate', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none">
          <div className="w-full max-w-md h-[400px]"><Wireframe3D shape="torus" color="#4ade80" speed={0.6} /></div>
        </div>
        <div className="relative z-10 text-center">
          <span className="material-symbols-outlined text-6xl text-primary mb-4 block">account_circle</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign in to see your Profile</h2>
          <p className="text-slate-500 mb-6">View your achievements and account details.</p>
          <Link to="/auth">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20">
              Sign In / Register
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold shadow-xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Hero — spinning torus behind avatar */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden flex flex-col items-center text-center mb-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-emerald-50 dark:from-primary/20 dark:to-slate-900 border border-primary/10 py-10 px-6">
        <div className="absolute inset-0 flex items-center justify-center opacity-25 dark:opacity-20 pointer-events-none">
          <div className="w-72 h-72"><Wireframe3D shape="torus" color="#4ade80" speed={0.9} /></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/20 blur-3xl rounded-full pointer-events-none" />

        {/* Clickable Avatar */}
        <div className="relative mb-5 z-10">
          <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-2 bg-gradient-to-tr from-primary to-emerald-300 rounded-full blur opacity-40" />
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl bg-primary/10 group cursor-pointer">
            <img alt={user?.name}
              className="w-full h-full object-cover"
              src={user?.avatar || avatarUrl(AVATAR_SEEDS[0])} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
            </div>
          </motion.button>
        </div>

        {/* Avatar Picker */}
        <AnimatePresence>
          {showAvatarPicker && (
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-20 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 mb-4 w-full max-w-xs">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Choose your 3D avatar</p>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_SEEDS.map((seed) => (
                  <motion.button key={seed} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                    onClick={() => handleAvatarChange(seed)}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 transition-all ${seed === currentSeed ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30'}`}>
                    <img src={avatarUrl(seed)} alt={seed} className="w-12 h-12 rounded-full bg-slate-100 object-cover" />
                    <span className="text-[9px] font-semibold text-slate-400">{seed}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h1>
        <p className="relative z-10 text-slate-500 text-sm mt-1">{user?.email}</p>

        <div className="relative z-10 flex gap-3 mt-5">
          <Link to="/dashboard">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-base">dashboard</span>Dashboard
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 hover:border-red-200 transition-all">
            <span className="material-symbols-outlined text-base">logout</span>Logout
          </motion.button>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">bar_chart</span>Your Stats
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 text-center shadow-sm">
                <div className={`${s.bg} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Achievements */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">military_tech</span>Achievements
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: 'light_mode', label: 'Early Bird', subtitle: 'First habit', locked: stats.totalHabits === 0 },
            { icon: 'local_fire_department', label: 'On Fire', subtitle: '3+ day streak', locked: (stats.longestStreak || 0) < 3 },
            { icon: 'star', label: 'Achiever', subtitle: 'Joined a challenge', locked: challengeCount === 0 },
            { icon: 'diamond', label: 'Consistent', subtitle: '7+ day streak', locked: (stats.longestStreak || 0) < 7 },
            { icon: 'workspace_premium', label: 'Expert', subtitle: '5+ habits', locked: (stats.totalHabits || 0) < 5 },
            { icon: 'people', label: 'Community', subtitle: 'Active member', locked: false },
          ].map((badge, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.08, type: 'spring' }}
              whileHover={!badge.locked ? { y: -6, scale: 1.05 } : {}}
              className={`flex flex-col items-center bg-white dark:bg-slate-800 p-5 rounded-2xl border text-center transition-all ${badge.locked
                ? 'border-slate-100 dark:border-slate-700 opacity-40 grayscale'
                : 'border-slate-100 dark:border-slate-700 cursor-pointer hover:border-primary/30 hover:shadow-md'
                }`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 relative">
                <span className="material-symbols-outlined text-primary text-2xl">{badge.icon}</span>
                {badge.locked && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[10px]">lock</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">{badge.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{badge.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Account Settings — fully functional */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">manage_accounts</span>Account Settings
        </h2>
        <p className="text-xs text-slate-400 mb-5">Hover any field to edit it.</p>

        <EditableField label="Display Name" icon="person" value={user?.name || ''} onSave={handleUpdateName} />

        <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
            <p className="font-semibold text-slate-800 dark:text-white">{user?.email}</p>
          </div>
          <span className="material-symbols-outlined text-slate-300 text-lg">mail</span>
        </div>

        <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Password</p>
            <p className="font-semibold text-slate-500">••••••••</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-1.5 text-sm text-primary font-bold px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-sm">lock_reset</span>Change
          </motion.button>
        </div>

        <div className="flex items-center justify-between py-3.5">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
            <p className="font-semibold text-slate-800 dark:text-white">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
            </p>
          </div>
          <span className="material-symbols-outlined text-slate-300 text-lg">calendar_today</span>
        </div>
      </motion.section>

      {/* Danger Zone */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
        className="border border-red-100 dark:border-red-900/30 rounded-2xl p-5 bg-red-50/50 dark:bg-red-900/10 mb-6">
        <h3 className="text-sm font-bold text-red-500 mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">warning</span>Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sign out of all sessions</p>
            <p className="text-xs text-slate-400">You'll need to sign in again on all devices.</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-red-500 font-bold px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <span className="material-symbols-outlined text-sm">logout</span>Sign Out
          </motion.button>
        </div>
      </motion.section>

      <div className="mt-4 text-center">
        <p className="text-slate-300 text-xs">Momentum © 2025. Keep moving forward.</p>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal onClose={() => setShowPasswordModal(false)} onSave={handleChangePassword} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
