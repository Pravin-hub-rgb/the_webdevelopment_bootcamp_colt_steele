const express = require('express')
const app = express()
const shelterRoutes = require('./route/shelter')
const adminRoutes = require('./route/admin')

app.use('/shelters', shelterRoutes)
app.use('/admin', adminRoutes)

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
})