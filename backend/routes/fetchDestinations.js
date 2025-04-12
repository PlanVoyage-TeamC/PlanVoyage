const express = require('express');
const router = express.Router();
const destination = require('../models/Destinations')

router.get('/destinations', async(req,res) => {
    try{
        const destinations = await destination.find();
        res.status(200).json(destinations);
//      console.log(destinations);
    }catch (err) {
        res.status(500).send('Server error');
      }

});
module.exports = router;