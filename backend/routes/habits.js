import express from 'express';
import { body, validationResult } from 'express-validator';
import Habit from '../models/Habit.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/habits
// @desc    Get all habits for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, habits });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/habits
// @desc    Create a new habit
// @access  Private
router.post('/', [
    protect,
    body('title').trim().notEmpty().withMessage('Title is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { title, description, icon, category } = req.body;

        const habit = await Habit.create({
            user: req.user._id,
            title,
            description,
            icon,
            category
        });

        res.status(201).json({ success: true, habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/habits/:id
// @desc    Update a habit (toggle completion, update streak)
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        let habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
        }

        // Make sure user owns habit
        if (habit.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        // Toggle completion
        if (req.body.hasOwnProperty('completed')) {
            habit.completed = req.body.completed;

            // Update streak logic
            if (req.body.completed) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (habit.lastCompletedDate) {
                    const lastDate = new Date(habit.lastCompletedDate);
                    lastDate.setHours(0, 0, 0, 0);

                    const diffTime = today - lastDate;
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);

                    if (diffDays === 1) {
                        // Consecutive day
                        habit.streak += 1;
                    } else if (diffDays > 1) {
                        // Streak broken
                        habit.streak = 1;
                    }
                } else {
                    // First completion
                    habit.streak = 1;
                }

                habit.lastCompletedDate = new Date();
            }
        }

        // Update other fields if provided
        if (req.body.title) habit.title = req.body.title;
        if (req.body.description !== undefined) habit.description = req.body.description;
        if (req.body.icon) habit.icon = req.body.icon;
        if (req.body.category) habit.category = req.body.category;

        await habit.save();

        res.json({ success: true, habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /api/habits/:id
// @desc    Delete a habit
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
        }

        // Make sure user owns habit
        if (habit.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await habit.deleteOne();

        res.json({ success: true, message: 'Habit removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/habits/stats
// @desc    Get user habit statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id });

        const totalHabits = habits.length;
        const completedToday = habits.filter(h => h.completed).length;
        const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
        const longestStreak = Math.max(...habits.map(h => h.streak), 0);

        res.json({
            success: true,
            stats: {
                totalHabits,
                completedToday,
                totalStreak,
                longestStreak,
                completionRate: totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
