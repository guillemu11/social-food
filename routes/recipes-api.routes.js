
const { response } = require('express')
const express = require('express')
const router = express.Router()

const spoonacularRequire = require('../services/api-handler')
const RecipeApi = new spoonacularRequire()

router.get('/random', (req, res) => {

    RecipeApi
        .randomRecipes()
        .then(response => {
            const {data} = response
            console.log(data)
           res.render('pages/perfil/random-recipe', data)
             })

        .catch(err => console.log('error', err))

})

router.get('/buscar', (req, res) =>{

   
    RecipeApi
        .searchRecipes()
        .then(response =>{
            console.log('-----------------', response)
        })
        .catch(err => console.log('error', err))


})



module.exports = router