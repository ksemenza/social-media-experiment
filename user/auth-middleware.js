const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'penguins live in the desert to eat cactus';
require('dotenv').config();

module.exports = (req, res, next) => {

    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: `<-- Token is invalid = Matrix will not let you enter`})
            } else {
                //anything downstream has access to token
                req.decodedToken = decodedToken
                next();
            }
        })

    } else {
        res.status(400).json({message:'*** You cannot enter the Matrix without token ***'})
    };
};