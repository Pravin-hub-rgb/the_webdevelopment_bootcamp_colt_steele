
mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Open!")
    })
    .catch(err => {
        console.log("Error!")
        console.log(err)
    })

movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

Movie = mongoose.model('Movie', movieSchema)

// Movie.insertMany([
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
//     { title: 'Alien', year: 1979, score: 7.5, rating: 'PG' },
//     { title: 'The Iron Giant', year: 1999, score: 8.6, rating: 'R' },
//     { title: 'Stand By Me', year: 1989, score: 8.6, rating: 'R' },
//     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
// ]).then(data => {
//     console.log("It worked");
//     console.log(data);
// })
