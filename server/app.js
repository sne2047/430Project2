const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');
const redis = require('redis');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Project2';
//this may be totally wrong for the local one, check again later when it's complete enough for testing

mongoose.connect(dbURL, (err) => {
    if (err) {
        console.log('Could not connect to database.');
        throw err;
    }
});

//redis stufffffff
//Skipped for now cause getting redis properly set up for this w/o breaking domomaker...
//yeaaaah tiring, worn out.
//also there's more redis stuff a bit further down. be sure to get that too.

//bring in our router
const router = require('./router.js');

const app = express();//app
//get the app set up
app.use('/assets',express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true,
}));
//more redis stuffffff
//needs to be put here
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());
//csrf needs to be in this location, after cookie parser and before the router
app.use(csrf());
app.use((err, req, res, next) => {
    if(err.code !== 'EBADCSRFTOKEN') return next(err);
    console.log('Missing CSRF token.');
    return false;
});

//aaaand finally hook up the router
router(app);

app.listen(port, (err) => {
    if(err){
        throw err;
    }

    console.log(`Listening on port ${port}`);
});

