
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
    const {cuisine} = req.body
    
    RecipeApi
        .searchRecipes(cuisine)
        .then(response =>{
            const { data } = response
            res.render('pages/perfil/search-recipes', {data})
        })
        .catch(err => console.log('error', err))
})

// router.get('/buscar/filtrar', (req, res) =>{

//     RecipeApi
//         .searchRecipesByCuisine()
//         .then(response => console.log(response))
// })



module.exports = router