const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherRatingSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }
    ],
    rating: {
        type: Number
    },
})

module.exports = mongoose.model('TeacherRating', teacherRatingSchema);