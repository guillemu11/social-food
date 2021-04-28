const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')
const { CDNupload } = require('../config/file-upload.config')

//bconst { checkRoles, isLoggedIn } = require('./../middlewares')
// const { response } = require('express')



// router.get('/crear', isLoggedIn, checkRoles('USER'), (req, res) => res.redirect('/'))

router.post('/crear', CDNupload.single('image'), (req, res) => {

    const image = req.file.path
    const { location, name, description, cuisine } = req.body

    Restaurant
        .create({ location, name, description, cuisine, image })
        .then(response => {
            console.log(response)
            res.redirect('/')
        })
        .catch(err => console.log('errrrroorrr', err))
})

module.exports = router