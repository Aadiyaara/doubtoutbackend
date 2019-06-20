const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    doubtSession: {
        type: Schema.Types.ObjectId,
        ref: 'DoubtSession',
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    doubtText: {
        type: String,
        required: true
    },
    doubtImage: {
        type: String
    },
    bounceRate: {
        type: Number,
        required: true
    },
    validated: {
        type: Boolean,
        required: true,
    },
    rejected: {
        type: Boolean,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Request', requestSchema)