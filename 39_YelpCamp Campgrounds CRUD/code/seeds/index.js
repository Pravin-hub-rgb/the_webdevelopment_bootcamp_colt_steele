cities = require('./citites')
const { places, descriptors } = require('./seedHelpers')
mongoose = require('mongoose')
Campground = require('../models/campgrounds')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
})

sample = array => array[Math.floor(Math.random() * array.length)]

seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        rand1000 = Math.floor(Math.random() * 1000) // as there are 1000 cities
        camp = new Campground({
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})