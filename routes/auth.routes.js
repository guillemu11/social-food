const express = require('express')
const { route } = require('./base.routes')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')

const { checkMongooseError } = require('./../utils')


router.get('/registro', (req, res) => res.render('pages/auth/signup'))

router.post('/registro', (req, res) => {

    const { username, pwd, pwd2 } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(pwd, salt)
    const hashPass2 = bcrypt.hashSync(pwd2, salt)

    User
        .create({ username, password: hashPass, password2: hashPass2 })
        .then(() => {
            if (password === password2) {
                res.redirect('/')
            }
        })
        .catch(err => res.render('pages/auth/signup', { errorMessage: checkMongooseError(err) }))

})


router.get('/inicio-sesion', (req, res) => res.render('pages/auth/login'))


router.post('/inicio-sesion', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login', { errorMessage: 'usuario no reconocido' })
            }
            if (bcrypt.compare(pwd, user.password) === false) {

                res.render('pages/auth/login', { errorMessage: 'contraseña no reconocido' })
            }

            req.session.currentUser = user
            res.redirect('/')
        })

        .catch(err => console.log('error', err))


})

router.get('/cerrar-sesion', (req, res) => {
    req.session.destroy((err) => res.redirect("/inicio-sesion"));
})






module.exports = router