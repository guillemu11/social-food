const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('../config/file-upload.config')


// const { checkRoles, isLoggedIn } = require('./../middlewares')

router.post('/crear', CDNupload.single('image'), (req, res) =>{

    const image = req.file.path
    
    // res.send(req.file)
    // console.log(req.file)
    const { name, description, method, ingredients} = req.body

    Recipes
        .create({name, description, method, ingredients, image})
        .then(()=> res.redirect('/'))
        .catch(err => console.log('ERRROOOOOOOOOR', err))
})

router.get('/', (req, res) =>{

    Recipes
        .find()
        .populate('user')
        .then(allRecipesPost => res.render('/', {allRecipesPost}))
        .catch(err => console.log('ERRRRRROR', err))
})



module.exports = router