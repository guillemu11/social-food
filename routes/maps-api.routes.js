const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')

router.get('/restaurants', (req, res) => {

    Restaurant
        .find()
        .then(restaurants => res.json(restaurants))
        .catch(err => console.log('soy un error DE SERVIDOR y salgo por la terminal!', err))
})

module.exports = router
