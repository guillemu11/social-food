module.exports = {
     isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/auth/login', { errorMessage: 'Inicia sesión para acceder' })
        }
    },
    checkRoles: (...allowedRoles) => (req, res, next) => {          // REST PARAMETERS
        if (allowedRoles.includes(req.session.currentUser.role)) {
            res.render('pages/perfil/add-form')
            next()
        } else {
            res.render('pages/auth/login', { errorMessage: 'Desautorizado' })
        }
    }
}