mongoose = require('mongoose')
Schema = mongoose.Schema

CampgroundSchema = new Schema({
    title: String,
    image:String,
    price: Number,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema)