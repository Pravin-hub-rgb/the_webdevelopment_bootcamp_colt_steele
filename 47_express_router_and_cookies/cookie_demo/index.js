const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
// for using the signed cookies and have cookie-parser support that
// we need to pass in a secret like this
app.use(cookieParser('thisismysecret'))

app.get('/greet', (req, res) => {
    const { name = 'anonymous' } = req.cookies
    res.send('Hey there ' + name)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'stevie chicks')
    res.send('Okay set you a cookie')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true })
    // third variable is used for signing
    res.send('Okay signed your fruit cookie')
})
app.get('/verifyfruit', (req, res) => {
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})