const express = require('express')
const router = express.Router()

router.use((req, res, next) => { // this middleware will work on every single 
    if (req.query.isAdmin) { // checking for isAdmin query
        next()
    }
    res.send("Sorry not an Admin!!")
})

router.get('/topsecret', (req, res) => {
    res.send('this is top secret.')
})

router.get('/deleteeverything', (req, res) => {
    res.send('Ok deleted it all!')
})
// let say we want to protect these two routes with some middleware
// every route in here is going to use above middleware
module.exports = router