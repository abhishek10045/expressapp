const router = require('express').Router();
const controllers = require('../controllers/user');

router.get('/logout', controllers.logout);

router.get('/login', controllers.login_get);

router.post('/login', controllers.login_post);

router.get('/register', controllers.register_get);

router.post('/register', controllers.register_post);

module.exports = router;