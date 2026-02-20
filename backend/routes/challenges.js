import express from 'express';
import { body, validationResult } from 'express-validator';
import Challenge from '../models/Challenge.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/challenges
// @desc    Get all challenges
// @access  Public
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find()
            .populate('createdBy', 'name avatar')
            .sort({ createdAt: -1 });

        res.json({ success: true, challenges });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/challenges/my
// @desc    Get user's joined challenges
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const challenges = await Challenge.find({ participants: req.user._id })
            .populate('createdBy', 'name avatar')
            .sort({ createdAt: -1 });

        res.json({ success: true, challenges });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/challenges
// @desc    Create a new challenge
// @access  Private
router.post('/', [
    protect,
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['fitness', 'mindfulness', 'productivity', 'social', 'learning', 'health']).withMessage('Invalid category'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { title, description, icon, category, difficulty, duration, maxParticipants } = req.body;

        const challenge = await Challenge.create({
            title,
            description,
            icon,
            category,
            difficulty,
            duration,
            maxParticipants,
            createdBy: req.user._id,
            participants: [req.user._id]
        });

        await challenge.populate('createdBy', 'name avatar');

        res.status(201).json({ success: true, challenge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/challenges/:id/join
// @desc    Join a challenge
// @access  Private
router.post('/:id/join', protect, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).json({ success: false, message: 'Challenge not found' });
        }

        // Check if already joined
        if (challenge.participants.includes(req.user._id)) {
            return res.status(400).json({ success: false, message: 'Already joined this challenge' });
        }

        // Check if challenge is full
        if (challenge.participants.length >= challenge.maxParticipants) {
            return res.status(400).json({ success: false, message: 'Challenge is full' });
        }

        challenge.participants.push(req.user._id);
        await challenge.save();

        await challenge.populate('createdBy', 'name avatar');

        res.json({ success: true, challenge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/challenges/:id/leave
// @desc    Leave a challenge
// @access  Private
router.post('/:id/leave', protect, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).json({ success: false, message: 'Challenge not found' });
        }

        // Check if user is in the challenge
        if (!challenge.participants.includes(req.user._id)) {
            return res.status(400).json({ success: false, message: 'Not part of this challenge' });
        }

        challenge.participants = challenge.participants.filter(
            participant => participant.toString() !== req.user._id.toString()
        );

        await challenge.save();

        res.json({ success: true, message: 'Left challenge successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/challenges/:id/like
// @desc    Toggle like on a challenge (auth required)
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

        const userId = req.user._id;
        const alreadyLiked = challenge.likes.some(id => id.toString() === userId.toString());

        if (alreadyLiked) {
            challenge.likes = challenge.likes.filter(id => id.toString() !== userId.toString());
        } else {
            challenge.likes.push(userId);
        }

        await challenge.save();
        await challenge.populate('createdBy', 'name avatar');
        res.json({ success: true, challenge, liked: !alreadyLiked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/challenges/:id/wishlist
// @desc    Toggle wishlist (save) on a challenge (auth required)
// @access  Private
router.post('/:id/wishlist', protect, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

        const userId = req.user._id;
        const alreadySaved = challenge.wishlisted.some(id => id.toString() === userId.toString());

        if (alreadySaved) {
            challenge.wishlisted = challenge.wishlisted.filter(id => id.toString() !== userId.toString());
        } else {
            challenge.wishlisted.push(userId);
        }

        await challenge.save();
        await challenge.populate('createdBy', 'name avatar');
        res.json({ success: true, challenge, wishlisted: !alreadySaved });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
