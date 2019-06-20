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
    age: {
        type: Number,
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
    isAvailable: {
        type: Boolean,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true
    },
    lastSession: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DoubtSession'
        }
    ],
    rating: {
        type: Schema.Types.ObjectId,
        ref: 'TeacherRating'
    }
})

module.exports = mongoose.model('Teacher', teacherSchema);