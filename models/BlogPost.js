const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema(
    {
        blogTitle: {required: true, type: String},
        blogText: {required: true, type: String},
        metadata: {required: false, type: String},
        slug: {required: true, type: String}
    },
    { timestamps: true }
)

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost