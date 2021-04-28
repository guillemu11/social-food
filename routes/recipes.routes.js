const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('../config/file-upload.config')
const { response } = require('express')


 const { checkRoles, isLoggedIn } = require('./../middlewares')

router.post('/crear', CDNupload.single('image'), (req, res) => {

    const image = req.file.path
    const { name, description, cookware, text, time, ingredients } = req.body
    const author = req.session.currentUser._id

    let steps = []
    for(let i = 0; i < 4; i++){
        let obj = {}
        obj.text = text[i]
        obj.cookware = cookware[i]
        obj.time = time[i]
        steps.push(obj)
    } 
    

    Recipes
        .create({name, description, steps, ingredients, image, author})
        .then(()=> res.redirect('/'))
        .catch(err => console.log('ERRROOOOOOOOOR', err))
})

router.get('/:id', (req, res) =>{

    Recipes
        .findById(req.params.id)
        .then(oneRecipe => res.render('pages/recipe/recipe-detail', {oneRecipe}))
        .catch(err => console.log('errrorrr', err))

})


router.get('/borrar',  (req, res) =>{

    Recipes
        .findByIdAndDelete(req.query.id)
        .then(() => res.redirect('pages/index'))
        .catch(err => console.log('errreeoeooo', err))
})


router.get('/editar/:id', (req, res) => {


})

module.exports = router
