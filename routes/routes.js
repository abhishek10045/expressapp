const userRoutes = require('./user');
const routes = require('./index');

module.exports = (app) => {
    app.use('/user', userRoutes);
    app.use('/', routes);
}