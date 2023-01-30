const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const campgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
    // as this will run after the campground is deleted so the deleted campground will be passed in
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)