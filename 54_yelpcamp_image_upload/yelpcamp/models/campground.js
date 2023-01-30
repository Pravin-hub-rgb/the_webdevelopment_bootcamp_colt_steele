const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
})
// now we set virtual property on every image
ImageSchema.virtual('thumbnail').get(function () {
    // this refers to to particular image instance that is being created
    return this.url.replace('/upload', '/upload/w_200')
})
// so the reason we use a virtual is that we don't need to store in the database 
// because it is being derive from the information that we are already storing
// so we have to make request to get the thumbnail url
const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
