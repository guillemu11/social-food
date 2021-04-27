const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')


// Endpoints
router.get('/', (req, res) => res.render('pages/index'))


//draw Recipes created by the users

router.get('/', (req, res) => {

    Recipes
        .find()
        .populate('user')
        .then(allRecipesPost => res.render('/', { allRecipesPost }))
        .catch(err => console.log('ERRRRRROR', err))
})




module.exports = router
