const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')

const { CDNupload } = require('./../config/file-upload.config')


const { checkRoles, isLoggedIn } = require('./../middlewares')


router.get('/', isLoggedIn, checkRoles('USER'), (req, res) => res.render('pages/perfil/add-form'))

// router.get('/restaurante', isLoggedIn, checkRoles('USER'), (req, res) => res.redirect('/'))

// router.post('/restaurante', CDNupload.single('userImage'), isLoggedIn, checkRoles('USER'), (req, res) =>{

//     const { description, name} = req.body
//     const { path } = req.file

//     Restaurant
//         .create({description, name, path})
//         .then(() => res.redirect('/'))
//         .catch(err=> console.log('errrrroorrr', err))
// })

// router.get('/restaurante', (req, res) =>{

//     Restaurant
//         .find()
//         .then(allRestaurantPost =>{
//             res.render('pages/index.hbs', {allRestaurantPost})
//         })


// })


module.exports = router