const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection open!');
    })
    .catch(err => {
        console.log('Oh no mongo connection Error!');
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id: false }, // this will stop mongoose to create an ID
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            }
        } // this address will have a separate ID's
        // mongo is going to treat this as it own embeded schema 
        // we can turn this off
    ]
    // In SQL we would have to make two tables (user and address) to mimic this type of structure
})

const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res);
}

// makeUser()

// adding more address 

const addAddress = async (id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '99 Dork St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    user.save()
}

addAddress('639b3a2e9e4d78ccd44c7d49')