import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    message: String,

    origin: {
        type: String,
    },

    level: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },    
});

export const LogModel = mongoose.model('Log', logSchema);