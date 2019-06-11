const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    subject: {
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
        type: String,
        required: true
    },
    questions: [
        {
            type: String,
        }
    ],
    options: [
        {
            type: String,
        }
    ],
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Session'
        }
    ]
})

module.exports = mongoose.model('Quiz', quizSchema);