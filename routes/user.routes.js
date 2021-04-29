const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const Restaurant = require('./../models/restaurant-post.model')
const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('./../config/file-upload.config')


const { checkRoles, isLoggedIn } = require('./../middlewares')


router.get('/', isLoggedIn, checkRoles('USER'), (req, res) => res.render('pages/perfil/add-form'))

router.get('/perfil/:id', (req, res) => {

    const userName = User.findById(req.params.id)
    const userRestaurant = Restaurant.find({ author: req.params.id })
    const userRecipe = Recipes.find({ author: req.params.id})

    Promise.all([userRestaurant, userRecipe, userName])
        .then(userPost => {
            console.log(userPost)
            res.render('pages/perfil/perfil-usuario', { userRestaurant: userPost[0], userRecipe: userPost[1] })
        })
        .catch(err => console.log('erroR!!!!', err))
})

router.get('/tu-perfil', isLoggedIn, (req, res) => {

    const profileRestaurants = Restaurant.find({ author: req.session.currentUser  })
    const profileRecipes = Recipes.find({ author: req.session.currentUser })

    Promise.all([profileRestaurants, profileRecipes])
        .then(userPost => {
            console.log(userPost)
            res.render('pages/perfil/your-profile', { urProfileRestaurant: userPost[0], urProfileRecipes: userPost[1] })
        })
        .catch(err => console.log('erroR!!!!', err))

})


module.exports = router