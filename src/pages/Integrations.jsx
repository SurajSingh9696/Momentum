import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const integrations = [
  { icon: 'fitness_center', name: 'Apple Health', category: 'Health', desc: 'Sync workouts and activity automatically from your Apple Health data.' },
  { icon: 'monitor_heart', name: 'Google Fit', category: 'Health', desc: 'Pull steps, heart rate and sleep data directly into your habit streaks.' },
  { icon: 'alarm', name: 'Google Calendar', category: 'Productivity', desc: 'Schedule habit check-ins as calendar events and get smart reminders.' },
  { icon: 'task_alt', name: 'Notion', category: 'Productivity', desc: 'Push daily habit logs into your Notion workspace automatically.' },
  { icon: 'notifications', name: 'Slack', category: 'Team', desc: 'Get daily accountability digests and team nudges right in Slack.' },
  { icon: 'group', name: 'Microsoft Teams', category: 'Team', desc: 'Share team leaderboards and celebrate milestones inside Teams.' },
  { icon: 'bolt', name: 'Zapier', category: 'Automation', desc: 'Connect Momentum to 5 000+ apps with no-code Zapier workflows.' },
  { icon: 'hub', name: 'IFTTT', category: 'Automation', desc: 'Trigger actions across your smart-home and web services on habit completion.' },
  { icon: 'store', name: 'Shopify', category: 'Rewards', desc: 'Redeem habit streak points as discount codes in your Shopify store.' },
];

const categories = ['All', 'Health', 'Productivity', 'Team', 'Automation', 'Rewards'];

const Integrations = () => {
  const [active, setActive] = React.useState('All');
  const filtered = active === 'All' ? integrations : integrations.filter((i) => i.category === active);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <Header />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-16 px-6 text-center"
      >
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <span className="material-symbols-outlined text-sm">hub</span>Integrations
        </span>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          Connects with your <span className="text-primary">whole life.</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Momentum plugs into the tools you already use — health apps, calendars, team chats and more.
        </p>
      </motion.section>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 px-6 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              active === cat
                ? 'bg-primary text-background-dark'
                : 'bg-white dark:bg-slate-900 border border-primary/10 text-slate-600 dark:text-slate-400 hover:border-primary/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 border border-primary/5 hover:border-primary/30 rounded-2xl p-6 transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{item.name}</h3>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.category}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-primary rounded-2xl p-12 text-center text-background-dark"
        >
          <h2 className="text-3xl font-black mb-4">Don't see your tool?</h2>
          <p className="mb-8 opacity-80">We're constantly adding new integrations. Shoot us a request and we'll prioritise it.</p>
          <a href="mailto:hello@momentum.app">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-background-dark text-white px-8 py-3 rounded-full font-bold"
            >
              Request an Integration
            </motion.button>
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Integrations;
