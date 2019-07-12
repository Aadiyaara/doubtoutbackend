const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    kind: {
        type: String,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    dateMade: {
        type: String,
        required: true
    },
    doubtSessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DoubtSession'
        }
    ]
})

module.exports = mongoose.model('Group', groupSchema);