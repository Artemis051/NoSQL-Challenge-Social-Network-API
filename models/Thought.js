const mongoose = require('mongoose');

// reaction schema
const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toISOString() 
    }
}, {
    toJSON: {
        getters: true // this gives us the get option
    },
    id: false // come back to this later
});

const thoughtSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 280 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
