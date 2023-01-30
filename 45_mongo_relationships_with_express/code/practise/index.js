const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const Product = require('./models/product')
const Farm = require('./models/farm')

mongoose.connect('mongodb://localhost:27017/farmApp2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open!")
    })
    .catch(err => {
        console.log("Mongo Connection Error!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetalbe', 'dairy', 'fungus']

app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category) {
        products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

// **************** FARM ROUTES *****************
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({})
    res.render('farms/index', { farms })
})

// CREATE
app.get('/farms/new', async (req, res) => {
    res.render('farms/new')
})
app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body)
    await farm.save()
    res.redirect('/farms')
})

// Show page
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products')
    const products = farm.products
    res.render('farms/show', { farm, products })
})

// NEW PRODUCT FOR A FARM
app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params
    const farm = await Farm.findById(id)
    console.log(farm);
    res.render('products/new', { categories, id, farm })
})
app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params
    const farm = await Farm.findById(id)
    const { name, price, category } = req.body
    const product = new Product({ name, price, category })
    farm.products.push(product)
    product.farm = farm
    await farm.save()
    await product.save()
    res.redirect(`/farms/${farm._id}`)
})

// Delete farm
app.delete('/farms/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id)
    // when we are deleting a farm we want all product associated with it should also be deleted
    // there are two ways of doing this 
    // 1 - the manual way where we write our code in this route and delete all product
    // 2 - using a mongoose middleware
    res.redirect('/farms')
})

//  ************* PRODUCT ROUTES **************

// CREATE Product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
app.post('/products', async (req, res) => {
    const { name, price } = req.body
    product = new Product({ name, price })
    await product.save()
    res.redirect('/products')
})


// SHOW 
app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    product = await Product.findById(id).populate('farm', 'name')
    res.render('products/show', { product })
})

// UPDATE 
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    foundProduct = await Product.findById(id)
    res.render('products/edit', { product: foundProduct, categories })
})
app.patch('/products/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, category } = req.body
    await Product.findByIdAndUpdate(id, { name, price, category })
    res.redirect(`/products/${id}`)
})

// DELETE 
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
