const express = require('express')
const router = express.Router()


const Restaurant = require('./../models/restaurant-post.model')
const Recipes = require('./../models/recipes-post.model')
const User = require('./../models/user.model')





//draw Recipes created by the users

router.get('/', (req, res, next) => {
    const restaurantes = Restaurant.find().populate('author')

    const recetas = Recipes.find().populate('author')

    Promise.all([restaurantes, recetas])
        .then(resultado => {
            res.render('pages/index', { restaurantes: resultado[0], recetas: resultado[1] })
        })
        .catch(err => next(new Error(err)))

})



module.exports = router
