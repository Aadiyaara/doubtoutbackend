const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true,
    },
    sessionToken: {
        type: String,
        required: true
    },
    instances: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    students: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('Session', sessionSchema)