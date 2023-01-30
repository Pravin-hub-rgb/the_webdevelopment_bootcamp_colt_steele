const express = require('express')
const router = express.Router()
const users = require('../controllers/user')
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')

// Register
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

// Login
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)

// Logout
router.get('/logout', users.logout)

module.exports = router