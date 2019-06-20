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
    lastSession: {
        type: Schema.Types.ObjectId,
        ref: 'DoubtSession'
    },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DoubtSession'
        }
    ]
})

module.exports = mongoose.model('Student', studentSchema);