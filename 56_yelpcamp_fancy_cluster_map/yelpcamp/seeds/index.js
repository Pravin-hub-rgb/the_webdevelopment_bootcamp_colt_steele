cities = require('./citites')
const { places, descriptors } = require('./seedHelpers')
mongoose = require('mongoose')
Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected");
})

sample = array => array[Math.floor(Math.random() * array.length)]

seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 400; i++) {
    rand1000 = Math.floor(Math.random() * 1000) // as there are 1000 cities
    price = Math.floor(Math.random() * 40)
    camp = new Campground({
      author: '63a7d721c87e2b3572286c27',
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur maiores dolor tempore. Possimus eligendi facere eos vel aliquid dignissimos perferendis praesentium repudiandae labore error soluta quibusdam cum non fugiat quis sint sed veniam rerum, voluptatum ipsum. Molestiae ducimus aliquid dicta!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[rand1000].longitude,
          cities[rand1000].latitude
        ]
      },
      images: [{
        url: 'https://res.cloudinary.com/dg9ycwwm1/image/upload/v1672227691/YelpCamp/okon5srxgg44w3oohdug.jpg',
        filename: 'YelpCamp/okon5srxgg44w3oohdug'
      },
      {
        url: 'https://res.cloudinary.com/dg9ycwwm1/image/upload/v1672227692/YelpCamp/ihhgyjyy4biux2xxsmmo.jpg',
        filename: 'YelpCamp/ihhgyjyy4biux2xxsmmo'
      },
      {
        url: 'https://res.cloudinary.com/dg9ycwwm1/image/upload/v1672227698/YelpCamp/bvthcsnrxbvbieiebfvp.jpg',
        filename: 'YelpCamp/bvthcsnrxbvbieiebfvp'
      }
      ]
    })
    await camp.save()
  }
}
seedDB().then(() => {
  mongoose.connection.close()
})