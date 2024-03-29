const { response } = require('express')
const express = require('express')
const router = express.Router()

const spoonacularRequire = require('../services/api-handler')
const RecipeApi = new spoonacularRequire()

router.get('/random', (req, res) => {

    RecipeApi
        .randomRecipes()
        .then(response => {
            const { data } = response
            res.render('pages/perfil/random-recipe', data)
        })
        .catch(err => console.log('error', err))
})

router.get('/buscar', (req, res) => {

    const { cuisine } = req.query

    RecipeApi
        .searchRecipesByCuisine(cuisine)
        .then(response => {
            const { data } = response
            res.render('pages/api-recipes/search-recipes', { data })

        })
        .catch(err => console.log('error', err))
})



router.get('/tipos', (req, res) => {

    const { type } = req.query

    RecipeApi
        .searchRecipesByType(type)
        .then(response => {
            const { data } = response
            res.render('pages/api-recipes/search-type', { data })

        })
        .catch(err => console.log('error!', err))
})

router.get('/', (req, res) => {

    const { id, title } = req.query

    RecipeApi
        .recipeInformation(id)
        .then(apiInfo => {
            console.log({ apiInfo: apiInfo.data, title })
            res.render('pages/api-recipes/recipe-info', { apiInfo: apiInfo.data, title })
            console.log('-------Api Infoooooo', apiInfo.data[0].steps[0])
        })
        .catch(err => console.log('error', err))
})

// router.get('/buscar/filtrar', (req, res) =>{

//     RecipeApi
//         .searchRecipesByCuisine()
//         .then(response => console.log(response))
//         .catch(err => console.log('error', err))
// })

module.exports = router