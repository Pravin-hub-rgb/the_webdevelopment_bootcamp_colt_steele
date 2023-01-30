const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection open!');
    })
    .catch(err => {
        console.log('Oh no mongo connection Error!');
        console.log(err)
    })

const userSchema = new Schema({
    username: String,
    age: Number,
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

const makeTweets = async () => {
    // const user = new User({ username: 'chickenfan99', age: 61 })
    const user = await User.findOne({ username: 'chickenfan99' })

    // const tweet1 = new Tweet({ text: 'omg I love my chicken family!', likes: 0 })
    // tweet1.user = user;
    const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 5 })
    tweet2.user = user;

    // user.save()
    // tweet1.save()
    tweet2.save()
}
// makeTweets()

// populating the user
const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username') // finding all  and populating only specific part
    console.log(t);
}
findTweet()