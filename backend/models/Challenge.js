import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a challenge title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    icon: {
        type: String,
        default: 'emoji_events'
    },
    category: {
        type: String,
        enum: ['fitness', 'mindfulness', 'productivity', 'social', 'learning', 'health'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', 'beginner', 'intermediate', 'advanced'],
        default: 'medium'
    },
    duration: {
        type: Number,
        required: [true, 'Please provide duration in days'],
        min: 1
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    wishlisted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxParticipants: {
        type: Number,
        default: 1000
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Challenge', challengeSchema);
