const router = require('express').Router();
const Sales = require('../models/salesModel');

router.get('/', (req, res) => {
    Sales.find({})
        .then(sales => {
            res.send({ sales:sales, message: 'Sales fetched successfully' });
        })
        .catch(err => {
            res.status(400).send(err);
        }
        );
})

module.exports = router;