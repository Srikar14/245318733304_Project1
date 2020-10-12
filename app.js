const express = require('express')
const app = express()

require('dotenv/config');



//Connect to DB

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB");
});

app.use(express.json())

const login = require('./authorization/login')
app.use('/login', login)

//Import routes

const checkToken = require('./authorization/checkToken')

const hospital = require('./routes/hospital');
app.use('/hospital', checkToken, hospital)
const ventilator = require('./routes/ventilator');
app.use('/ventilator', checkToken,ventilator);

//Start server

app.listen(process.env.PORT);