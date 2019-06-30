const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateJoined: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateLastLogin: {
        type: String,
        required: true
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    lastDoubtSession: {
        type: Schema.Types.ObjectId,
        ref: 'DoubtSession'
    },
    lastQuizSession: {
        type: Schema.Types.ObjectId,
        ref: 'QuizSession'
    },
    doubtSessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DoubtSession'
        }
    ],
    quizSessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'QuizSession'
        }
    ]
})

module.exports = mongoose.model('Student', studentSchema);