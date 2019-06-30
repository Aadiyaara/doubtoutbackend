const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizQuestionSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: [
        {
            type: String,
            required: true
        }
    ],
})

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema)