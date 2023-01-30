const express = require('express')
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection open!');
    })
    .catch(err => {
        console.log('Oh no mongo connection Error!');
        console.log(err)
    })
mongoose.set('strictQuery', true);

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'notagoodsecret' }))

// now if we have to secure multiple route then it is better to use a middleware
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.send('this is the homepage')
})

// 1 registering user
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', async (req, res) => {
    const { password, username } = req.body
    const user = new User({ username, password })
    // we will setup a middleware to generate a hash password before we save it in user schema file
    await user.save()
    req.session.user_id = user._id
    res.redirect('/')
})

// 2 Login Functionality
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id
        res.redirect('/secret')
    } else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null
    // there is another method - req.session.destroy()
    // so instead of removing one property this remove entire session properties 

    res.redirect('/login')
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})
app.get('/topsecret', requireLogin, (req, res) => {
    res.send('Top Secret')
})

app.listen(3000, () => {
    console.log('Serving your app');
})

