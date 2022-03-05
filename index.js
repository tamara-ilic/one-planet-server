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

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

app.use(express.static('public'))

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
    .route('/products/:id')
    .get(async (request, response) => {
        const product = await Product.find({ _id: request.params.id })
        response.json(product)
    })
    .put(async (request, response) => {
        const product = await Product.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            // sends back the updated version, which is not the default
            {
                new: true
            }
        )
        response.send(product)
    })    
    .delete(async (request, response) => {
        const product = await Product.findByIdAndDelete(
            { _id: request.params.id },
            request.body
        )
        response.send(product)
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