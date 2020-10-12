require('dotenv/config')

const jwt = require('jsonwebtoken')
const router = require('express').Router()

router.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username && password) {
        console.log(process.env.USERNAME)
        if (username === process.env.USERNAME && password === process.env.PASSWORD) {
            const token = jwt.sign(
                    { username: username }, 
                    process.env.ACCESS_TOKEN_SECRET, 
                    { expiresIn: '24h'}
                )
            res.json({
                message: 'Authentication Successfull',
                token: token
            })
        } else {
            res.status(403).send({
                message: 'Wrong username or password'
            })
        }
    } else {
        res.status(400).send({
            message: 'Authentication failed'
        })
    }
})

module.exports = router