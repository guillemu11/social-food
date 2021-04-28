const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('../config/file-upload.config')
const { response } = require('express')


// const { checkRoles, isLoggedIn } = require('./../middlewares')

router.post('/crear', CDNupload.single('image'), (req, res) => {

    const images = req.file.path

    // res.send(req.file)
    // console.log(req.file)
    const { name, description, steps, ingredients } = req.body

    Recipes
        .create({ name, description, steps, ingredients, images })
        .then(newFood => {
            console.log(newFood)
            res.redirect('/')})
        .catch(err => console.log('ERRROOOOOOOOOR', err))
})


module.exports = router