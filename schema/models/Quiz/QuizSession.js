const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSessionSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    dateAttempted: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('QuizSession', quizSessionSchema);