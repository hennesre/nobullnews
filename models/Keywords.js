const mongoose = require('mongoose');
require('mongoose-type-url');

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


module.exports = mongoose.model('keywords', keywordSchema);

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

const articleSchema = new mongoose.Schema({
    source: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        trim: true,
    },
    link: {
        work: mongoose.SchemaTypes.Url,
        profile: mongoose.SchemaTypes.Url
    }
});

module.exports = mongoose.model('articles', articleSchema);