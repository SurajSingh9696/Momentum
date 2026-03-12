import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const stories = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer · Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    habit: 'Daily Coding Practice',
    streak: 180,
    quote:
      'I went from inconsistent side-project work to shipping a full SaaS product in 6 months. Momentum\'s streak system kept me accountable every single day.',
    metric: '+180 day streak',
    metricIcon: 'local_fire_department',
  },
  {
    name: 'Marcus Johnson',
    role: 'Personal Trainer · Lagos',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    habit: 'Morning Workout',
    streak: 365,
    quote:
      'I built a 365-day workout streak that completely transformed my physique and mindset. The community challenges pushed me when I wanted to quit.',
    metric: '1 year streak 🏆',
    metricIcon: 'fitness_center',
  },
  {
    name: 'Sophie Williams',
    role: 'Marketing Manager · London',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    habit: 'Daily Journaling',
    streak: 90,
    quote:
      'Three months in and I\'ve filled two journals. My anxiety reduced dramatically because I finally had a space to process my thoughts consistently.',
    metric: '90 days journaling',
    metricIcon: 'menu_book',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Product Designer · Tokyo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    habit: 'Meditation',
    streak: 210,
    quote:
      'I launched my freelance design studio after building a daily meditation practice through Momentum. The clarity I gained was invaluable for big decisions.',
    metric: '210 mindful days',
    metricIcon: 'self_improvement',
  },
  {
    name: 'Amara Osei',
    role: 'PhD Candidate · Accra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    habit: 'Research Reading',
    streak: 120,
    quote:
      'Reading one paper a day doesn\'t sound like much, but after 4 months I had reviewed over 120 papers — my thesis defence was a breeze.',
    metric: '120+ papers read',
    metricIcon: 'science',
  },
  {
    name: 'Elena Rossi',
    role: 'Chef & Food Blogger · Rome',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    habit: 'Recipe Development',
    streak: 75,
    quote:
      'I challenged myself to create a new recipe every day for 75 days. That challenge became a cookbook deal I never expected.',
    metric: 'Cookbook deal! 🎉',
    metricIcon: 'restaurant',
  },
];

const stats = [
  { value: '10 000+', label: 'Active members' },
  { value: '2.4M', label: 'Habits tracked' },
  { value: '98%', label: 'Would recommend' },
  { value: '47 days', label: 'Avg. streak length' },
];

const SuccessStories = () => (
  <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
    <Header />

    {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-24 pb-16 px-6 text-center"
    >
      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
        <span className="material-symbols-outlined text-sm">star</span>Success Stories
      </span>
      <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
        Real people. <span className="text-primary">Real results.</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
        From coding to cooking, our community members are proving that small daily actions compound into life-changing outcomes.
      </p>
    </motion.section>

    {/* Stats bar */}
    <section className="px-6 pb-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-6 text-center"
          >
            <p className="text-3xl font-black text-primary mb-1">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Story cards */}
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <motion.div
            key={story.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-slate-900 border border-primary/5 hover:border-primary/30 rounded-2xl p-6 flex flex-col gap-4 transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <p className="font-bold text-sm">{story.name}</p>
                <p className="text-xs text-slate-400">{story.role}</p>
              </div>
            </div>

            <blockquote className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic flex-1">
              "{story.quote}"
            </blockquote>

            <div className="flex items-center gap-2 bg-primary/10 text-primary rounded-xl px-3 py-2 text-sm font-bold w-fit">
              <span className="material-symbols-outlined text-base">{story.metricIcon}</span>
              {story.metric}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default SuccessStories;
