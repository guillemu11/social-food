const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')

const { CDNupload } = require('./../config/file-upload.config')


const { checkRoles, isLoggedIn } = require('./../middlewares')



router.get('/crear', isLoggedIn, checkRoles('USER'), (req, res) => res.redirect('/'))

router.post('/crear', CDNupload.single('userImage'), (req, res) => {

    const { description, name } = req.body
    const  image  = req.file.path

    Restaurant
        .create({ description, name })
        .then(() => res.redirect('/'))
        .catch(err => console.log('errrrroorrr', err))
})

// router.get('/mostrar', (req, res) =>{

//     Restaurant
//         .find()
//         .then(allRestaurantPost =>{
//             res.render('pages/perfil/' {allRestaurantPost}) 
//         })


// })

module.exports = router