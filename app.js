const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/user');
const routes = require('./routes/index');
require('./hbs');

const PORT = 3000;
const app = express();

app.set('view engine', 'hbs');

app.use('/assets', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
    cookie : {
        secure : false,
        maxAge : 60 * 60  * 1000
    }
}));

app.use('/user', userRoutes);
app.use('/', routes);

app.listen(PORT);