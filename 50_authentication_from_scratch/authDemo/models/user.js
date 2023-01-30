const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: { // here we are going to store the hashed password 

        type: String,
        required: [true, 'Password cannot be blank']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username })
    if (foundUser) {
        const isValid = await bcrypt.compare(password, foundUser.password)
        return isValid ? foundUser : false
    }
    return false;
}
// statics is where we can define multiple methods that will be added to the user model itself 
// not to a particular instances of user

userSchema.pre('save', async function (next) {
    // any time we save a user this middleware runs so even if we are changing the username still the password will be rehashed and we don't want that 
    // and for that we use this.isModified('password') this will tell us true or false is it has been modified
    if (!this.isModified('password')) return next() // just save it
    this.password = await bcrypt.hash(this.password, 12)
    next() // here this is save
})

module.exports = mongoose.model('User', userSchema)