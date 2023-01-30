const express = require('express')
const router = express.Router() // making an empty router

router.get('/', (req, res) => { // here we are adding four different routes
    res.send("All Shelters")
})
router.post('/', (req, res) => {
    res.send("Creating Shelter")
})
router.get('/:id', (req, res) => {
    res.send("One Shelter")
})
router.get('/:id/edit', (req, res) => {
    res.send("Editig a Shelters")
})

module.exports = router