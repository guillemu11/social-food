const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')
const User = require('./../models/user.model')
const { CDNupload } = require('../config/file-upload.config')

const { checkRoles, isLoggedIn } = require('./../middlewares')

const { isUser } = require('./../utils')
// const { response } = require('express')



// router.get('/crear', isLoggedIn, checkRoles('USER'), (req, res) => res.redirect('/'))

router.post('/crear', CDNupload.single('image'), (req, res) => {

    const image = req.file.path
    console.log('de crear', req.file.path)
    const { location, name, description, cuisine } = req.body
    const author = req.session.currentUser._id

    Restaurant
        .create({ author, location, name, description, cuisine, image })
        .then(response => {
            console.log(response)
            res.redirect('/')
        })
        .catch(err => console.log('errrrroorrr', err))
})

router.get('/details/:restaurante_id', (req, res) => {

    const { restaurante_id } = req.params
    const { currentUser } = req.session

    Restaurant
        .findById(restaurante_id)
        .then(restaurantInfo => res.render('pages/perfil/restaurant-details', { restaurantInfo, isUser: isUser(currentUser) }))
        .catch(err => console.log('Error!!!', err))
})


router.get('/lista', (req, res) =>{
    
    Restaurant
    .find()
    .then(theRestaurants => res.render('pages/restaurants/restaurant-list', {theRestaurants}))
    .catch(err => console.log('erroooooor', err))
})

module.exports = router