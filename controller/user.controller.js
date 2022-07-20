const db = require("../models");
const User = db.user;
const passportLocal = require('../config/passportLocal')
const passportJwt = require('../config/passportJWT');
const getJWT = require("../genJWT");

function create(req, res) {
    const userdata = {
        username: req.body.username,
        password: req.body.password
    }
    console.log('>> User', User);
    User.create(userdata).then(data => {
        return res.send(data)
    }).catch(err => {
        console.warn(err)
    })
}

async function getUser(req, res) {
    if (!req.params.id) {
        return res.send("ID is Required")
    }
    try {
        const userData = await User.findByPk(req.params.id)
        return res.send({
            status: 'valid',
            data: userData
        })
    } catch (error) {
        throw error;
    }
}

async function loginWithPassport(req, res) {
    return await passportLocal.authenticate('local', function (err, response) {
        if (response) {
            return res.send({
                msg: "Login Success",
                token: getJWT()
            })
        }
        if (!response) {
            return res.send({
                msg: "Failed"
            })
        }
    })(req, res)
}

async function routeWithPassportJWT(req, res) {
    return await passportJwt.authenticate('jwt', { session: false }, function (err, response) {
        if (response) {
            return res.send({
                msg: "Route Success"
            })
        }
        return res.send({
            msg: "Route Failed",
            err
        })
    })(req, res)
}

function checkOTP(req, res) {
    const otp = req.body.otp;
    if (otp === '123') {
        return res.send({
            msg: 'SUCcess'
        })
    }
    return res.send({
        err: true
    })
}

module.exports = {
    create,
    getUser,
    loginWithPassport,
    routeWithPassportJWT,
    checkOTP
}