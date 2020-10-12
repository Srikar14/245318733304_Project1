require('dotenv/config')
const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] 
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, Rjson) => {
            if (err) {
                return res.status(401).send({
                    message: 'Your access token is not valid'
                })
            } else {
                req.decoded = Rjson;
                next();
            }
        })
        
    } else {
        return res.status(422).send({
            message: 'Could not find the Auth Token'
        });
    }
};

module.exports = checkToken