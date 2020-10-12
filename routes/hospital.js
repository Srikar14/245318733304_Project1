const router = require('express').Router();
const Hospital = require('../models/Hospital');
const bodyParser = require('body-parser');


//Routes
router.get('/', async (req, res) => {
    try {
        const hosps = await Hospital.find({});
        console.log(hosps);
        res.json(hosps);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const hosp = new Hospital(req.body);
    try {
        const addHosp = await hosp.save();
        res.json(addHosp);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hospSerch = await Hospital.find({ hId: req.params.id })
        res.json(hospSerch);
    }
    catch (err) {
        res.json(err);
    }
});



module.exports = router;