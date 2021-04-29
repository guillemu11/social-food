const express = require('express')
const router = express.Router()


const Restaurant = require('./../models/restaurant-post.model')
const Recipes = require('./../models/recipes-post.model')
const User = require('./../models/user.model')
const { response } = require('express')





//draw Recipes and Restaurants created by the users

router.get('/', (req, res, next) => {
    const restaurants = Restaurant.find().populate('author')
    const recipes = Recipes.find().populate('author')

    Promise.all([restaurants, recipes])
        .then(response => {
            res.render('pages/index', { allRestaurants: response[0], allRecipes: response[1] })
        })
        .catch(err => next(new Error(err)))
})



module.exports = router
