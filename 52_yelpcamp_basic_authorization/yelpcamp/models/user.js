const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose) // this will add on to our schema a username and password field
// it is going to make sure those usernames are unique, they are not duplicated

module.exports = mongoose.model('User', UserSchema)