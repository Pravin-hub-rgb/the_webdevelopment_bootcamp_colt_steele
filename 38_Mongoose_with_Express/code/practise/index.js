express = require('express')
path = require('path')
app = express()
mongoose = require('mongoose')
Product = require('./models/product')
methodOverride = require('method-override')

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

// CREATE 
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
    product = await Product.findById(id)
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
