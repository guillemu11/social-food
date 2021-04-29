const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('../config/file-upload.config')
const { response } = require('express')

const { checkRoles, isLoggedIn } = require('./../middlewares')
const { isUser } = require('./../utils')


router.post('/crear', isLoggedIn, CDNupload.single('image'), (req, res) => {

    const image = req.file.path
    const { name, description, cookware, text, time, ingredients } = req.body
    const author = req.session.currentUser._id

    let steps = []
    for (let i = 0; i < 4; i++) {
        let obj = {}
        obj.text = text[i]
        obj.cookware = cookware[i]
        obj.time = time[i]
        steps.push(obj)
    }

    Recipes
        .create({ name, description, steps, ingredients, author, image })
        .then(() => res.redirect('/'))
        .catch(err => console.log('ERRROOOOOOOOOR', err))
})

router.get('/detalles/:recipes_id', (req, res) => {

    const { recipes_id } = req.params
    const { currentUser } = req.session

    Recipes
        .findById(recipes_id)
        .then(oneRecipe => res.render('pages/recipes/recipe-detail', { oneRecipe, isUser: isUser(currentUser) }))
        .catch(err => console.log('errrorrr', err))
})

router.get('/lista', (req, res) => {

    Recipes
        .find()
        .then(theRecipes => res.render('pages/recipes/recipe-list', { theRecipes }))
        .catch(err => console.log('erroooooor', err))
})

module.exports = router
