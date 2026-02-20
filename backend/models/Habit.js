import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a habit title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    icon: {
        type: String,
        default: 'check_circle'
    },
    completed: {
        type: Boolean,
        default: false
    },
    streak: {
        type: Number,
        default: 0
    },
    lastCompletedDate: {
        type: Date
    },
    category: {
        type: String,
        enum: ['health', 'productivity', 'mindfulness', 'fitness', 'learning', 'other'],
        default: 'other'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Habit', habitSchema);
