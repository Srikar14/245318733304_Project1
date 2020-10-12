const router = require('express').Router();
const Ventilator = require('../models/Ventilator');
const bodyParser = require('body-parser');


//Routes
router.get('/', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try {
            const vents = await Ventilator.find({})
            res.json(vents)
        } catch (err) {
            res.json({ message: err })
        }
        return
    } 
    try {
        const vents = await Ventilator.find({ $and: [{ status: req.query.status }, { name: req.query.name }] })
        res.json(vents)
    } catch (err) {
        res.json({ message: err })
    }
});
router.post('/', async (req, res) => {
    const vent = new Ventilator({
        hId: req.body.hId,
        status: req.body.status,
        ventId: req.body.ventId,
        name: req.body.name
    });
    try {
        const addVent = await vent.save();
        res.json(addVent);
    } catch (err) {
        res.json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const vent = await Ventilator.findOneAndRemove({ ventId: req.params.id })
        res.json(vent)
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch('/', async (req, res) => {
    try {
        const {ventId, status} = req.body
        const vent = await Ventilator.updateOne({"ventId": ventId}, {$set: {"status": status}}) 
        res.json(vent)
    } catch(err) {
        res.json({ message: err })
    }
})
module.exports = router;