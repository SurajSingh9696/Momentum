/**
 * Seed Script — Run once to populate the database with demo challenges.
 * Usage: node backend/seed.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Challenge from './models/Challenge.js';
import User from './models/User.js';

dotenv.config();

const demoUser = {
    name: 'Momentum Team',
    email: 'demo@momentum.app',
    password: 'Demo1234!',
};

const demoChallenges = [
    {
        title: '30 Days of Morning Yoga',
        description: 'A beginner-friendly flow designed to wake up your body and focus your mind for the day ahead. Just 15 minutes every morning.',
        icon: 'self_improvement',
        category: 'mindfulness',
        difficulty: 'easy',
        duration: 30,
        maxParticipants: 2000,
    },
    {
        title: 'Deep Work Sprint',
        description: 'Master your focus with daily 45-minute distraction-free work blocks. Perfect for tackling complex projects without interruption.',
        icon: 'timer',
        category: 'productivity',
        difficulty: 'medium',
        duration: 21,
        maxParticipants: 1000,
    },
    {
        title: 'Gratitude Journaling',
        description: 'Five minutes of daily reflection to rewire your brain for positivity and long-term well-being. Write 3 things you\'re grateful for.',
        icon: 'menu_book',
        category: 'mindfulness',
        difficulty: 'easy',
        duration: 30,
        maxParticipants: 5000,
    },
    {
        title: 'Strength Foundations',
        description: 'Build a solid base with bodyweight movements. No equipment needed, just your dedication and consistency.',
        icon: 'fitness_center',
        category: 'fitness',
        difficulty: 'medium',
        duration: 60,
        maxParticipants: 1500,
    },
    {
        title: '8 Glasses of Water Daily',
        description: 'The simplest health habit: drink 8 glasses of water every day for 30 days. Your body will thank you.',
        icon: 'water_drop',
        category: 'health',
        difficulty: 'easy',
        duration: 30,
        maxParticipants: 10000,
    },
    {
        title: '100 Days of Code',
        description: 'Commit to coding for at least one hour every day for 100 days. Tweet your progress and build in public.',
        icon: 'code',
        category: 'learning',
        difficulty: 'hard',
        duration: 100,
        maxParticipants: 3000,
    },
    {
        title: 'Daily 5K Run',
        description: 'Run or walk 5 kilometers every day for 21 days. Build cardiovascular endurance and mental toughness.',
        icon: 'directions_run',
        category: 'fitness',
        difficulty: 'medium',
        duration: 21,
        maxParticipants: 800,
    },
    {
        title: 'Read 20 Pages Daily',
        description: 'Commit to reading at least 20 pages of any book every day. Knowledge compounds just like habits.',
        icon: 'auto_stories',
        category: 'learning',
        difficulty: 'easy',
        duration: 30,
        maxParticipants: 2500,
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Create or find demo user
        let user = await User.findOne({ email: demoUser.email });
        if (!user) {
            user = await User.create(demoUser);
            console.log('✅ Demo user created');
        } else {
            console.log('ℹ️  Demo user already exists');
        }

        // Check if challenges already exist
        const existing = await Challenge.countDocuments();
        if (existing > 0) {
            console.log(`ℹ️  ${existing} challenges already exist. Skipping seed.`);
            console.log('   (Delete challenges from DB to re-seed)');
            await mongoose.disconnect();
            return;
        }

        // Insert challenges
        const challenges = demoChallenges.map((c) => ({ ...c, createdBy: user._id }));
        await Challenge.insertMany(challenges);
        console.log(`✅ ${challenges.length} challenges seeded successfully!`);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

seed();
