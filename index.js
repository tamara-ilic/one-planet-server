const express = require('express')
const app = express()
const PORT = process.env.PORT || 7070
require('dotenv').config()
const connectToDB = require('./models')
const Product = require('./models/Product')
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

connectToDB().then(() => {
    app.listen(PORT, () => console.log('Server running'))    
})