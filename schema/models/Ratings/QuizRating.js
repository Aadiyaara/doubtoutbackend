const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizRatingSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }
    ],
    rating: {
        type: Number
    },
})

module.exports = mongoose.model('QuizRating', quizRatingSchema);