const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant-post.model')

const { CDNupload } = require('./../config/file-upload.config')


const { checkRoles, isLoggedIn } = require('./../middlewares')


router.get('/', isLoggedIn, checkRoles('USER'), (req, res) => res.render('pages/perfil/add-form'))



module.exports = router