module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/restaurante', require('./restaurant.routes.js'))
    app.use('/publicacion', require('./user.routes.js'))
    app.use('/recetas', require('./recipes.routes.js'))

}
