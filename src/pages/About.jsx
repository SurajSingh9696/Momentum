import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const team = [
  {
    name: 'Suraj Singh',
    role: 'Founder & Full-Stack Engineer',
    avatar: 'https://avatars.githubusercontent.com/SurajSingh9696',
    bio: 'Built Momentum to solve his own habit-consistency struggles. Passionate about the intersection of psychology, design and engineering.',
    github: 'https://github.com/SurajSingh9696',
  },
];

const values = [
  { icon: 'favorite', title: 'Consistency over perfection', desc: 'We celebrate showing up every day — not flawless execution.' },
  { icon: 'groups', title: 'Community first', desc: 'People succeed together. Every feature we ship strengthens the social layer.' },
  { icon: 'visibility', title: 'Radical transparency', desc: 'No dark patterns, no confusing pricing, no selling your data. Ever.' },
  { icon: 'psychology', title: 'Science-backed', desc: 'Everything we build is rooted in behavioural psychology and habit research.' },
];

const timeline = [
  { year: '2023', event: 'Momentum idea born from a 30-day challenge experiment.' },
  { year: 'Early 2024', event: 'First prototype launched to 50 beta testers.' },
  { year: 'Mid 2024', event: 'Public launch — 1 000 members in the first week.' },
  { year: 'Late 2024', event: 'Crossed 5 000 active members and launched Group Challenges.' },
  { year: '2025', event: '10 000+ members, AI nudge engine shipped, mobile PWA released.' },
];

const About = () => (
  <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
    <Header />

    {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-24 pb-20 px-6 text-center max-w-4xl mx-auto"
    >
      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
        <span className="material-symbols-outlined text-sm">info</span>About Us
      </span>
      <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
        We believe small actions <br />
        <span className="text-primary">change everything.</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Momentum was born from a simple question: why do most people know what to do but still fail to do it consistently?
        The answer is accountability, community, and tiny daily wins — and that's exactly what we built.
      </p>
    </motion.section>

    {/* Mission banner */}
    <section className="px-6 pb-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-primary rounded-2xl p-12 md:p-16 text-center text-background-dark"
      >
        <span className="material-symbols-outlined text-5xl mb-4 block">bolt</span>
        <h2 className="text-3xl md:text-4xl font-black mb-4">Our mission</h2>
        <p className="text-lg font-medium opacity-85 max-w-2xl mx-auto leading-relaxed">
          To make world-class habit formation accessible to everyone — regardless of willpower, background, or motivation — through the power of community and technology.
        </p>
      </motion.div>
    </section>

    {/* Values */}
    <section className="px-6 pb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-12">What we stand for</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-6 flex gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">{v.icon}</span>
            </div>
            <div>
              <h3 className="font-bold mb-1">{v.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="px-6 pb-20 max-w-3xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-12">Our journey</h2>
      <div className="relative border-l-2 border-primary/20 pl-8 space-y-8">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[2.65rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background-light dark:border-background-dark" />
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.year}</p>
            <p className="text-slate-700 dark:text-slate-300">{item.event}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="px-6 pb-24 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-center mb-12">Meet the team</h2>
      <div className="flex justify-center">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 text-center max-w-sm"
          >
            <img
              src={member.avatar}
              alt={member.name}
              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4ade80&color=122017&size=200`; }}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
            />
            <h3 className="font-black text-lg mb-0.5">{member.name}</h3>
            <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{member.bio}</p>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 pb-24 text-center">
      <Link to="/auth">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-background-dark px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary/20"
        >
          Join the Community
        </motion.button>
      </Link>
    </section>
  </div>
);

export default About;
