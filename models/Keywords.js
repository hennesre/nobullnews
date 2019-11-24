const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    term: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ['technology', 'indicator'],
        trim: true,
    },
});


module.exports = mongoose.model('Keywords', keywordSchema);

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Users', userSchema)