const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    dateJoined: {
        type: String,
        required: true
    },
    dateLastLogin: {
        type: String,
        required: true
    },
    lastSession: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Session'
        }
    ]
})

module.exports = mongoose.model('Teacher', teacherSchema);