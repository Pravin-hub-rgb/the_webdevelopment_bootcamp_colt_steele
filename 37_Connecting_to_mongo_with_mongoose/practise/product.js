mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopAppDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Open!")
    })
    .catch(err => {
        console.log("Error!")
        console.log(err)
    })
productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
})


productSchema.methods.greet = function () {
    console.log('HELLO!!! HI!! HOWDY!!!')
    console.log(`- from ${this.name}`);
}
Product = mongoose.model('Product', productSchema)

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'North Fake Bag' });
    foundProduct.greet();
}

// findProduct()
personSchema = new mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

Person = mongoose.model('Person',personSchema)

