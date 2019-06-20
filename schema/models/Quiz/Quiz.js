const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    dateMade: {
        type: String,
        required: true
    },
    dateLastAttempted: {
        type: String
    },
    questions: [
        {
            type: Types.Schema.ObjectId,
            ref: 'QuizQuestion'
        }
    ],
    quizSessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'QuizSession'
        }
    ],
    timesAttempted: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Quiz', quizSchema);