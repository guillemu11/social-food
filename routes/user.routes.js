const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const Restaurant = require('./../models/restaurant-post.model')
const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('./../config/file-upload.config')


const { checkRoles, isLoggedIn } = require('./../middlewares')


router.get('/', isLoggedIn, checkRoles('USER'), (req, res) => res.render('pages/perfil/add-form'))

router.get('/perfil', (req, res) => {

    const userRestaurantes = Restaurant.find({ author: req.session.currentUser._id })
    const userRecetas = Recipes.find({ author: req.session.currentUser._id })

    Promise.all([userRestaurantes, userRecetas])
        .then(userPost => {
            res.render('pages/perfil/perfil-usuario', { userRestaurantes: userPost[0], userRecetas: userPost[1] })
        })
        .catch(err => console.log('erroR!!!!', err))
})

module.exports = router