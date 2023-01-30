const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')
const AppError = require('./AppError')

mongoose.connect('mongodb://localhost:27017/farmApp', { useNewUrlParser: true, useUnifiedTopology: true })
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

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

// CREATE 
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', wrapAsync(async (req, res, next) => {
    try {
        const { name, price } = req.body
        product = new Product({ name, price })
        await product.save()
        res.redirect('/products')
    } catch (e) {
        next(e)
    }
}))

// SHOW 
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    product = await Product.findById(id)
    if (!product) {
        return next(new AppError('Product not found', 404))
    }
    res.render('products/show', { product })
}))

// UPDATE 
app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    foundProduct = await Product.findById(id)
    if (!foundProduct) {
        return next(new AppError('Product not found', 404))
    }
    res.render('products/edit', { product: foundProduct, categories })
}))
app.patch('/products/:id', wrapAsync(async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, price, category } = req.body
        await Product.findByIdAndUpdate(id, { name, price, category }, { runValidators: true })
        res.redirect(`/products/${id}`)
    } catch (e) {
        next(e)
    }
}))

// DELETE 
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validatio failed ... ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err)
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!' } = err
    res.status(status).send(message)
})
app.listen(3000, () => {
    console.log('Listening on port 3000');
})
