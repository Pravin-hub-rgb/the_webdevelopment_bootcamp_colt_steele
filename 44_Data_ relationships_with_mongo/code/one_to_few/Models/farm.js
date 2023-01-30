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

mongoose.set('strictQuery', true)

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winer']
    }
})

const Product = mongoose.model('Product', productSchema)

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Watermelon', price: 4.88, season: 'Summer' },
//     { name: 'Asparagus', price: 2.99, season: 'Spring' }
// ])

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // telling mongoose that each one of these entities are of 'object id' type
    // 'ref' option is what tells Mongoose which model to use during population.
})

const Farm = mongoose.model('Farm', farmSchema)

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' })
//     const melon = await Product.findOne({ name: 'Goddess Melon' })
//     farm.products.push(melon) // it seems like we are pushing an entire product.
//     await farm.save()
//     console.log(farm)
// }
// makeFarm()

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' })
    const watermelon = await Product.findOne({ name: 'Sugar Watermelon' })
    farm.products.push(watermelon)
    await farm.save()
}
// addProduct()

// we are only storing 'object ID' in products array of farm model 

Farm.findOne({name:'Full Belly Farms'})
.populate('products') // populating the products fields
.then(farm => console.log(farm))
