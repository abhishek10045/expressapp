const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('hbs');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/routes');
const db = require('./config/db').connection;

const app = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
    cookie : {
        secure : false,
        maxAge : 60 * 60 * 1000
    },
    store : new MongoStore({mongooseConnection : db})
}));

routes(app);

app.listen(3000);