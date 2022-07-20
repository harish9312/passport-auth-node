// project/config/passportLocal.js

const passport = require('passport')
const LocalStratery = require('passport-local').Strategy
const db = require('../models')

// Creating the passport instance to be used from the controller.

passport.use(new LocalStratery({

    // if you use any different name for the username field, you can pass the key here
    usernameField: 'username'
}, async function (username, password, done) {
    // findByPk is a Sequelize function which returns the data if it finds the primary key with the value passed
    return await db.user.findByPk(username).then(async data => {

        // Check if the user is there in the DB:
        if (!data) {
            return done(null, null)
        }

        // If the user is correct, then let's see if he has entered the correct password.
        await data.comparePassowrd(password, (err, userData) => {
            return done(null, userData)
        })
    }).catch(err => { throw err })
}))


// For Storing the user id in the session {req.session.passport.user = {id: '..'}}
passport.serializeUser(function (user, cb) {
    cb(null, user)
})

// For checking if the user has an active session.
passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
})

module.exports = passport