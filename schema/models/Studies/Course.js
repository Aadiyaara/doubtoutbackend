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
    targetGroup: {
        type: String,
        required: true
    },
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ],
    dateMade: {
        type: String,
        required: true
    },
    quizzes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    ],
    isOpen: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Course', courseSchema)