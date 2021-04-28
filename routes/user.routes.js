const express = require('express')
const router = express.Router()



const { checkRoles, isLoggedIn } = require('./../middlewares')


router.get('/', isLoggedIn, checkRoles('USER'), (req, res) => res.render('pages/perfil/add-form'))



module.exports = router