const mongoose = require("mongoose");

const ventSchema = mongoose.Schema(
    {
        hId: String,
        status: String,
        ventId: String,
        name: String
    }
);
module.exports = mongoose.model('Ventilator', ventSchema);