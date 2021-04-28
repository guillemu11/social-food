const express = require('express')
const router = express.Router()

const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('../config/file-upload.config')


// const { checkRoles, isLoggedIn } = require('./../middlewares')

router.post('/crear', CDNupload.single('image'), (req, res) =>{

    //const images = req.file.path
    const { name, description, short_description} = req.body
    console.log(req.body, description, short_description)
    // res.send(req.file)
    // console.log(req.file)
    const cookware = ["","","",""]
    const time = ["","","",""]
    const text = ["","","",""]

    let arraySteps = []
    for(let i = 0; i < cookware.length; i++){
        arraySteps += cookware
        for(let j = 0; j < time.length; j++){
            arraySteps += time
            for(let k = 0; k < text.length; k++){
                arraySteps += text
            }
        }
        return arraySteps
    } 
    
    res.send(req.body)

    Recipes
        .create({name, description, arraySteps})
        .then(()=> res.redirect('/'))
        .catch(err => console.log('ERRROOOOOOOOOR', err))
})

router.get('/:id', (req, res) =>{

    Recipes
        .findById(req.params.id)
        .then(oneRecipe => res.render('pages/perfil/recipe-detail', {oneRecipe}))
        .catch(err => console.log('errrorrr', err))

})


router.get('/borrar', (req, res) =>{

    Recipes
        .findByIdAndDelete(req.query.id)
        .then(() => res.redirect('pages/index'))
        .catch(err => console.log('errreeoeooo', err))
})




module.exports = router
