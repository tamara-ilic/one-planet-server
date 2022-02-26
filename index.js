const express = require('express')
const app = express()
const PORT = process.env.PORT || 7070
require('dotenv').config()
const connectToDB = require('./models')
const Product = require('./models/Product')
const Review = require('./models/Review')
const BlogPost = require('./models/BlogPost')
const cors = require('cors')

app.use(cors())

app.use((request, response, next) => {
    console.log(request.method, request.path)
    next()
})

app.use(express.json())

app
    .route('/products')
    .get(async (request, response) => {
        const products = await Product.find({})
        response.json(products)
    })

app
    .route('/reviews')
    .get(async (request, response) => {
        const reviews = await Review.find({})
        response.json(reviews)
})

app
    .route('/blogPosts')
    .get(async (request, response) => {
        const blogPosts = await BlogPost.find({})
        response.json(blogPosts)
})

connectToDB().then(() => {

    app.listen(PORT, () => console.log('Server running'))
})