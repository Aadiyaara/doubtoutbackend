const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doubtSessionSchema = new Schema({
    question: {
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
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    duration: {
        tpye: Number,
        required: false,
    },
    rating: {
        type: Schema.Types.ObjectId,
        ref: 'Rating',
    },
    isBroken: {
        type: Boolean,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('DoubtSession', doubtSessionSchema)