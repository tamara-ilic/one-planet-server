const fs = require('fs')

const contentfulExport = JSON.parse(fs.readFileSync('data/src.json', 'utf-8'))

const products = [] 
const blogPosts = [] 
const reviews = [] 

// tidy up data
contentfulExport.entries.forEach((p) => {

  // const prettyDescription = p.fields.description.content.flat()

  switch (p.sys.contentType.sys.id) {
    case 'product':
      products.push({
        title: p.fields.title['en-US'],
        // description: prettyDescription // p.fields.description['en-US'].content[0].content[0].value
        price: p.fields.price,
        weight: p.fields.weight,
        slug: p.fields.slug
        // metadata: p.fields.
        // prod_collectio: p.fields.
      }) 
      break 
    case 'reviews':
      reviews.push({
        headline: p.fields.headline['en-US'],
        review: p.fields.review,
        reviewer: p.fields.reviewer,
        rating: p.fields.rating
      }) 
      break
    case 'blog':
      blogPosts.push({
        blogTitle: p.fields.blogTitle['en-US'],
        blogText: p.fields.blogText // an object that needs to be broken down
      })
      break
    default:
      console.log('unrecognised content type')
  }
}) 

fs.writeFileSync('products.json', JSON.stringify(products)) 
fs.writeFileSync('reviews.json', JSON.stringify(reviews)) 
fs.writeFileSync('blogPosts.json', JSON.stringify(blogPosts)) 

console.log(products) 
// console.log(reviews)
// console.log(blogPosts)