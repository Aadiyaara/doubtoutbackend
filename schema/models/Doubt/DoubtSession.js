const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doubtSessionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    questionImage: {
        type: String,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    token: {
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
        type: Number,
    },
    rating: {
        type: Schema.Types.ObjectId,
        ref: 'DoubtSessionRating',
    },
    isBroken: {
        type: Boolean,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    },
    rawDataPoints: [
        {
            type: String
        }
    ],
    rawDataColors: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('DoubtSession', doubtSessionSchema)