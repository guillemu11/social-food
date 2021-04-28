const express = require('express')
const router = express.Router()


const Restaurant = require('./../models/restaurant-post.model')
const Recipes = require('./../models/recipes-post.model')
const User = require('./../models/user.model')





//draw Recipes created by the users

router.get('/', (req, res) => {
    const restaurantes = Restaurant.find().populate('author')

    const recetas = Recipes.find().populate('author')

    Promise.all([restaurantes, recetas])
        .then(resultado => {
            res.render('pages/index', { restaurantes: resultado[0], recetas: resultado[1] })
        })
        .catch(err => console.log('Error!!!', err))

})

router.get('/details/:restaurante_id', (req, res) => {

    const { restaurante_id } = req.params

    Restaurant
        .findById(restaurante_id)
        .then(restaurantInfo => res.render('pages/perfil/restaurant-details', restaurantInfo))
        .catch(err => console.log('Error!!!', err))
})

router.get('/editar/:restaurante_id', (req, res) => {

    const { restaurante_id } = req.params

    Restaurant
        .findById(restaurante_id)
        .populate('author')
        .then(restaurantInfo => res.render('pages/perfil/edit-restaurant', restaurantInfo))
        .catch(err => console.log('Error!!!', err))
})

router.post('/editar/:restaurante_id', (req, res) => {

    // const image = req.file.path
    const { restaurante_id } = req.params
    const { location, name, description, cuisine } = req.body

    Restaurant
        .findByIdAndUpdate(restaurante_id, { location, name, description, cuisine }, { new: true })
        .then(() => res.redirect('/'))
        .catch(err => console.log('Error!', err))
})

module.exports = router
