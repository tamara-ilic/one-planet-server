const { acceptsCharsets } = require('express/lib/request')
const fs = require('fs')

const contentfulExport = JSON.parse(fs.readFileSync('data/src.json', 'utf-8'))

const assets = contentfulExport.assets

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const products = [] 
const blogPosts = [] 
const reviews = []

// tidy up data
contentfulExport.entries.forEach((p) => {

  switch (p.sys.contentType.sys.id) {
    case 'product':
      const prettyDescription = p.fields.description['en-US'].content.filter((c) => {
        return c.content[0].value
      }).map((c) => {
        return c.content[0].value
      })
      //console.log(prettyDescription)
      products.push({
        title: p.fields.title['en-US'],
        description: prettyDescription,
        price: p.fields.price['en-US'],
        weight: p.fields.weight,
        slug: slugify(p.fields.title['en-US']),
        images: p.fields.productMedia["en-US"].map(m => m.sys.id).map(id => {
          return assets.find(a => a.sys.id === id).fields.file["en-US"].fileName.replaceAll(' ', '').replaceAll('_', '-').replaceAll('--', '-').replaceAll('-reusable', '')
      })
        // metadata: p.fields.
        // prod_collection: p.fields.
      }) 
      break 
    case 'reviews':
      reviews.push({
        headline: p.fields.headline['en-US'],
        review: p.fields.review,
        reviewer: p.fields.reviewer,
        rating: p.fields.rating,
        slug: slugify(p.fields.headline['en-US']),
      }) 
      break
    case 'blog':
      const prettyBlog = p.fields.blogText['en-US'].content.map((b) => {
        return b.content
        .filter(str => str.value?.length)
        .map(v => v.value)
        .map(str => str === "" ? "\n": str).join('')
       })
      //console.log(prettyBlog)
      blogPosts.push({
        blogTitle: p.fields.blogTitle['en-US'],
        blogText: prettyBlog,
        slug: slugify(p.fields.blogTitle['en-US']),
      })
      break
    default:
      console.log('unrecognised content type')
 
  }
}) 

fs.writeFileSync('products.json', JSON.stringify(products)) 
fs.writeFileSync('reviews.json', JSON.stringify(reviews)) 
fs.writeFileSync('blogPosts.json', JSON.stringify(blogPosts)) 

console.log(products[0].slug) 
// console.log(reviews)
// console.log(blogPosts)