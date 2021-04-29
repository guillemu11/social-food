const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')

const { CDNupload } = require('../config/file-upload.config')

const { checkRoles, isLoggedIn } = require('./../middlewares')

const { isUser, isAdmin } = require('./../utils')

router.post('/crear', CDNupload.single('image'), (req, res) => {

    const image = req.file.path
    
    const { location, name, description, cuisine } = req.body
    const author = req.session.currentUser._id

    Restaurant
        .create({ author, location, name, description, cuisine, image })
        .then(response => {
            
            res.redirect('/')
        })
        .catch(err => console.log('errrrroorrr', err))
})

router.get('/details/:restaurante_id', (req, res) => {

    const { restaurante_id } = req.params
    const { currentUser } = req.session

    Restaurant
        .findById(restaurante_id)
        .then(restaurantInfo => res.render('pages/perfil/restaurant-details', { restaurantInfo, isUser: isUser(currentUser), isAdmin: isAdmin(currentUser) }))
        .catch(err => console.log('Error!!!', err))
})



router.get('/lista', (req, res) => {

    Restaurant
        .find()
        .then(theRestaurants => res.render('pages/restaurants/restaurant-list', { theRestaurants }))
        .catch(err => console.log('erroooooor', err))
})

module.exports = router