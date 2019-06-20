const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizQuestionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    difficulty: {
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