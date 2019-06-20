const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
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
    phoneNumber: {
        type: String,
        required: true
    },
    dateLastLogin: {
        type: String,
        required: true
    },
    child: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
})

module.exports = mongoose.model('Parent', parentSchema);