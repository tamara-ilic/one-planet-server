const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
    {
        headline: {required: true, type: String},
        review: {required: true, type: String},
        reviewer: {required: true, type: String},
        rating: {required: true, type: Number},
        metadata: {required: false, type: String}
    },
    { timestamps: true }
)

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review