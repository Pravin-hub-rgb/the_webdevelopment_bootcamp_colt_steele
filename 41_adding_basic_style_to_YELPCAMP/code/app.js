express = require('express')
path = require('path')
mongoose = require('mongoose')
ejsMate = require('ejs-mate')
Campground = require('./models/campgrounds')
methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
})
app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

// ALL CAMPGROUND 
app.get('/campgrounds', async (req, res) => {
    campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})
// NEW 
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res) => {
    campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})
// SHOW 
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    campground = await Campground.findById(id)
    res.render('campgrounds/show', { campground })
})

// EDIT 
app.get('/campgrounds/:id/edit', async (req, res) => {
    campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
})
app.put('/campgrounds/:id', async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground })
    res.redirect(`/campgrounds/${req.params.id}`)
})

// DELETE 
app.delete('/campgrounds/:id', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    res.redirect('/campgrounds')
})
app.listen(3000, () => {
    console.log('Serving on port 3000!');
})