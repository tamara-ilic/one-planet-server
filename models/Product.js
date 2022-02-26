const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: {required: true, type: String},
        description: {required: true, type: Array},
        price: {required: true, type: Number},
        weight: {required: false, type: Number},
        slug: {required: false, type: String},
        metadata: {required: false, type: String}
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product