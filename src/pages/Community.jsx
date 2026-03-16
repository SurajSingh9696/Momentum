import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Wireframe3D from '../components/Wireframe3D';


const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Community = () => {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [postContent, setPostContent] = useState('');
  const [likingId, setLikingId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [commentingId, setCommentingId] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const textareaRef = useRef(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/posts');
      setPosts(res.data.posts || []);
    } catch {
      setError('Failed to load posts. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    setPosting(true);
    try {
      const res = await api.post('/posts', { content: postContent.trim() });
      setPosts((prev) => [res.data.post, ...prev]);
      setPostContent('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (post) => {
    if (!isAuthenticated) { window.location.href = '/auth'; return; }
    setLikingId(post._id);
    try {
      const res = await api.post(`/posts/${post._id}/like`);
      setPosts((prev) => prev.map((p) => (p._id === post._id ? res.data.post : p)));
    } catch {
      /* ignore */
    } finally {
      setLikingId(null);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleComment = async (postId) => {
    if (!isAuthenticated) {
      window.location.href = '/auth';
      return;
    }

    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    setCommentingId(postId);
    try {
      const res = await api.post(`/posts/${postId}/comment`, { text });
      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data.post : p)));
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      setOpenComments((prev) => ({ ...prev, [postId]: true }));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to comment');
    } finally {
      setCommentingId(null);
    }
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const isLiked = (post) => post.likes?.includes(user?.id);

  return (
    <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
      {/* 3D Hero Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-slate-50 to-primary/5 dark:from-blue-900/20 dark:via-slate-900 dark:to-slate-800 border border-blue-100 dark:border-white/10 p-6 sm:p-8 min-h-[170px]">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow orb */}
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        {/* 3D Sphere */}
        <div className="absolute right-0 top-0 bottom-0 w-52 sm:w-64 opacity-70 dark:opacity-50 pointer-events-none">
          <Wireframe3D shape="sphere" color="#60a5fa" speed={0.8} />
        </div>
        <div className="relative z-10">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">people</span>Community Feed
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Community</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Share your wins and cheer others on.</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full inline-block animate-pulse" />
              {posts.length} posts
            </span>
          </div>
        </div>
      </motion.div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <section className="lg:col-span-8 space-y-5">
          {/* Create Post */}
          {isAuthenticated ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-white/10">
              <form onSubmit={handlePost}>
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-primary/20 border border-primary/30">
                    <img className="h-full w-full object-cover"
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'user')}`}
                      alt="Your avatar" />
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="flex-1 min-h-[70px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-800 dark:text-white placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                    placeholder="Share your win, progress or tip..."
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    disabled={posting || !postContent.trim()}
                    className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-primary/20 disabled:opacity-40">
                    {posting ? 'Sharing...' : 'Share Update'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-white/10 text-center">
              <p className="text-slate-500 text-sm mb-3">Sign in to share your progress and interact with posts.</p>
              <Link to="/auth">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-primary/20">
                  Sign In
                </motion.button>
              </Link>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
              <button onClick={fetchPosts} className="ml-auto text-sm font-bold text-red-500 hover:underline">Retry</button>
            </div>
          )}

          {/* Posts */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 && !error ? (
            <div className="text-center py-20 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
              <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 block mb-3">forum</span>
              <p className="text-slate-500 font-medium">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.article key={post._id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden hover:border-primary/20 transition-all">
                  <div className="p-5">
                    {/* Author */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/10 shrink-0 bg-primary/10">
                          <img className="h-full w-full object-cover"
                            src={post.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(post.user?.name || 'u')}`}
                            alt={post.user?.name} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{post.user?.name || 'Anonymous'}</p>
                          <p className="text-xs text-slate-400">{timeAgo(post.createdAt)}</p>
                        </div>
                      </div>
                      {isAuthenticated && user?.id === post.user?._id?.toString() && (
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(post._id)}
                          className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </motion.button>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed text-[15px] mb-4">{post.content}</p>

                    {/* Image */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden aspect-video mb-4">
                        <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-5 pt-4 border-t border-slate-200 dark:border-white/5">
                      <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                        onClick={() => handleLike(post)}
                        disabled={likingId === post._id}
                        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isLiked(post) 
                          ? 'text-primary bg-primary/10' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-primary/5'}`}>
                        <span className={`material-symbols-outlined text-base ${isLiked(post) ? 'filled-icon' : ''}`}>favorite</span>
                        <span className="font-bold">{post.likes?.length || 0}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        onClick={() => toggleComments(post._id)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        <span className="material-symbols-outlined text-base">chat_bubble</span>
                        <span>{post.comments?.length || 0}</span>
                      </motion.button>
                    </div>

                    {/* Comments section container */}
                    {(openComments[post._id] || (post.comments?.length || 0) > 0 || isAuthenticated) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-5 pt-5 border-t border-slate-200 dark:border-white/5 space-y-4"
                      >
                        {/* Comment input */}
                        {isAuthenticated && (
                          <div className="flex items-end gap-3">
                            <div className="h-7 w-7 rounded-full overflow-hidden shrink-0 border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5">
                              <img
                                className="h-full w-full object-cover"
                                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'u')}`}
                                alt={user?.name}
                              />
                            </div>
                            <div className="flex-1 flex gap-2">
                              <textarea
                                value={commentInputs[post._id] || ''}
                                onChange={(e) => handleCommentChange(post._id, e.target.value.slice(0, 500))}
                                placeholder="Share your thoughts..."
                                disabled={commentingId === post._id}
                                rows={2}
                                className="flex-1 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-white/7 dark:to-white/3 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent text-sm leading-relaxed transition-all"
                              />
                              <motion.button
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleComment(post._id)}
                                disabled={commentingId === post._id || !(commentInputs[post._id] || '').trim()}
                                className="bg-gradient-to-br from-primary to-primary/90 hover:from-primary/95 hover:to-primary/80 text-background-dark px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                {commentingId === post._id ? (
                                  <span className="flex items-center gap-1.5">
                                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="inline-block">●</motion.span>
                                  </span>
                                ) : (
                                  'Reply'
                                )}
                              </motion.button>
                            </div>
                          </div>
                        )}

                        {/* Comments list */}
                        {openComments[post._id] && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3 mt-4"
                          >
                            {(post.comments || []).length === 0 ? (
                              <div className="flex items-center justify-center py-6">
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Be the first to reply!</p>
                              </div>
                            ) : (
                              (post.comments || []).map((comment, idx) => (
                                <motion.div
                                  key={comment._id || `${comment.user?._id || 'u'}-${comment.createdAt}`}
                                  initial={{ opacity: 0, y: -8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ x: 2 }}
                                  className="group rounded-2xl bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-white/5 dark:to-white/2 border border-slate-200 dark:border-white/8 p-3.5 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-slate-50/50 dark:hover:from-primary/10 dark:hover:to-white/5 transition-all"
                                >
                                  <div className="flex items-start gap-2.5">
                                    <div className="h-7 w-7 rounded-full overflow-hidden shrink-0 border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 flex-shrink-0">
                                      <img
                                        className="h-full w-full object-cover"
                                        src={comment.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(comment.user?.name || 'c')}`}
                                        alt={comment.user?.name || 'User'}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-baseline gap-2 mb-1">
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{comment.user?.name || 'User'}</p>
                                        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{timeAgo(comment.createdAt)}</p>
                                      </div>
                                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words">{comment.text}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              ))
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </section>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          {/* Streak Card */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-white/10">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">leaderboard</span>
              Quick Links
            </h3>
            <div className="space-y-2">
              {[
                { to: '/dashboard', icon: 'dashboard', label: 'My Dashboard' },
                { to: '/challenges', icon: 'explore', label: 'Challenges' },
                { to: '/profile', icon: 'person', label: 'My Profile' },
              ].map((item) => (
                <Link key={item.to} to={item.to}>
                  <motion.div whileHover={{ x: 4 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-slate-600 dark:text-slate-300 hover:text-primary transition-all font-medium text-sm">
                    <span className="material-symbols-outlined text-base">{item.icon}</span>
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Tips Card */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 border border-primary/10">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
              Daily Tip
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              "You don't have to be great to start, but you have to start to be great."
            </p>
            <p className="text-xs text-slate-400 mt-2 font-medium">— Zig Ziglar</p>
          </motion.div>
        </aside>
      </div>
    </main>
  );
};

export default Community;
