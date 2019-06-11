const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    dateMade: {
        type: String,
        required: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    sessions: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Session'
        }
    ],
    strength: {
        type: Number,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Course', courseSchema)