const jwt = require('jsonwebtoken')

const getJWT = () => {
    return jwt.sign({
        username: "harishsoni",
        email: "harish",
    }, 'myKey', {
        expiresIn: '1h'
    });
}

// console.log('getJWT', getJWT());

module.exports = getJWT