const passport = require('passport')
const JwtStratery = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const db = require('../models')
const JWT_KEY = 'myKey'
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_KEY;

passport.use(new JwtStratery(options, async function (jwtPayload, done) {
    await db.user.findByPk(jwtPayload.username).then(data => {
        if (!data) {
            return done(null, null)
        }
        return done(null, data)
    }).catch(err => { throw err })
    return done(null, null)
}))

module.exports = passport
