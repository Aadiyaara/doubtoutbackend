const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    doubtSession: {
        type: Schema.Types.ObjectId,
        ref: 'DoubtSession'
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    rating: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Rating', ratingSchema);