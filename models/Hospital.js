const mongoose = require('mongoose');
const hospitalSchema = mongoose.Schema(
    {
        hId: String,
        name: String,
        address: String,
        location: String,
        contactNo: String
    }
);
module.exports = mongoose.model('Hospital', hospitalSchema);