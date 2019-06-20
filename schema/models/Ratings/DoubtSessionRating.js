const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doubtSessionRatingSchema = new Schema({
    doubtSession: {
        type: Schema.Types.ObjectId,
        ref: 'DoubtSession',
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

module.exports = mongoose.model('DoubtSessionRating', doubtSessionRatingSchema);