const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')


// Endpoints
router.get('/', (req, res) => res.render('pages/index'))


//draw Recipes created by the users

router.get('/recetas/post', (req, res) => {
res.send('yayayayaya')
    Recipes
        .find()
        .populate('user')
        .then(allRecipesPost => {
            console.log('todas las recetas', allRecipesPost)
            // res.render('pages/index', { allRecipesPost })
    })
        .catch(err => console.log('ERRRRRROR', err))
})




module.exports = router
