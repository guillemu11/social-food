const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const Restaurant = require('./../models/restaurant-post.model')
const Recipes = require('./../models/recipes-post.model')

const { CDNupload } = require('./../config/file-upload.config')

const { checkRoles, isLoggedIn } = require('./../middlewares')
const { isUser } = require('./../utils')
const { response } = require('express')

router.get('/', isLoggedIn, checkRoles('USER'), (req, res) => res.render('pages/perfil/add-form'))

router.get('/perfil/:id', (req, res) => {

    const userName = User.findById(req.params.id)
    const userRestaurant = Restaurant.find({ author: req.params.id })
    const userRecipe = Recipes.find({ author: req.params.id })

    Promise.all([userRestaurant, userRecipe, userName])
        .then(userPost => {
            console.log(userPost)
            res.render('pages/perfil/perfil-usuario', { userRestaurant: userPost[0], userRecipe: userPost[1], userName: userPost[2] })
        })
        .catch(err => console.log('erroR!!!!', err))
})

router.get('/tu-perfil', isLoggedIn, (req, res) => {

    const profileRestaurants = Restaurant.find({ author: req.session.currentUser })
    const profileRecipes = Recipes.find({ author: req.session.currentUser })

    Promise.all([profileRestaurants, profileRecipes])
        .then(userPost => {
            console.log(userPost)
            res.render('pages/perfil/your-profile', { urProfileRestaurant: userPost[0], urProfileRecipes: userPost[1] })
        })
        .catch(err => console.log('erroR!!!!', err))

})

//*PROFILE ROUTES FOR EDIT AND DELETE YOUR POSTS*//

//*-----------RESTAURANTS-------------*//

router.get('/tu-perfil/restaurantes/detalles/:restaurante_id', (req, res) => {

    const { restaurante_id } = req.params
    const { currentUser } = req.session

    Restaurant
        .findById(restaurante_id)
        .then(restaurantInfo => res.render('pages/perfil/your-rest-details', { restaurantInfo, isUser: isUser(currentUser) }))
        .catch(err => console.log('Error!!!', err))
})

router.get('/restaurante/editar', (req, res) => {

    const { restaurante_id } = req.query

    Restaurant
        .findById(restaurante_id)
        .populate('author')
        .then(restaurantInfo => res.render('pages/perfil/edit-restaurant', restaurantInfo))
        .catch(err => console.log('Error!!!', err))
})


router.post('/restaurante/editar/:restaurante_id', isLoggedIn, checkRoles('USER', 'ADMIN'), CDNupload.single('image'), (req, res) => {

    console.log(req.params)
    console.log('-----', req.body)

    const image = req.file.path
    console.log('--- imagem -----', req.file.path)
    const { restaurante_id } = req.params
    const { ubication, name, description, cuisine } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Restaurant
        .findByIdAndUpdate(restaurante_id, { location, name, description, cuisine, image, ubication })
        .then(() => res.redirect('/'))
        .catch(err => console.log('Error!', err))
})


router.post('/restaurante/borrar/:restaurante_id', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res) => {

    const { restaurante_id } = req.params

    Restaurant
        .findByIdAndDelete(restaurante_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log('Error!', err))
})

//*-----------RECIPES----------*//

router.get('/tu-perfil/recetas/detalles/:recipes_id', (req, res) => {

    const { recipes_id } = req.params
    const { currentUser } = req.session

    Recipes
        .findById(recipes_id)
        .then(oneRecipe => res.render('pages/perfil/your-recipe-detail', { oneRecipe, isUser: isUser(currentUser) }))
        .catch(err => console.log('errrorrr', err))
})




router.get('/recetas/borrar/:recipes_id', (req, res) => {

    const { recipes_id } = req.params

    Recipes
        .findByIdAndDelete(recipes_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log('errreeoeooo', err))
})



router.get('/recetas/editar/:recipes_id', (req, res) => {

    const { recipes_id } = req.params

    Recipes
        .findById(recipes_id)
        .then(response => res.render('pages/recipes/edit-recipes', response))
        .catch(err => console.log('erroooooor', err))
})




router.post('/recetas/editar/:id', (req, res) => {

    const { id } = req.params

    const { name, description, cookware, text, time, ingredients } = req.body

    console.log('soy el bodyyyyyyyyyyyyyyyyy', req.body)
    console.log('soyyyyyyyyyyyyyyyyyyyyyyyy el paramssss', req.params)
    console.log('soy la imagennnnnnnnnn', req.file)
    
    let steps = []
    for (let i = 0; i < 4; i++) {
        let obj = {}
        obj.text = text[i]
        obj.cookware = cookware[i]
        obj.time = time[i]
        steps.push(obj)
    }

    Recipes
        .findByIdAndUpdate(id, { name, description, steps, ingredients })
        .then(() => res.redirect('/'))
        .catch(err => console.log('erroooooor', err))
})

module.exports = router