const pug = require('pug');
const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser('secret'));
app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

let urlencoded = bodyParser.urlencoded({extended:true});

// app.all('*', routes.getLastVisit);

// app.get('*', routes.visited);



app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get('/profile', routes.checkAuth, routes.profile);
app.get('/edit', routes.edit);
app.get('/logout', routes.logout);
app.get('/', routes.chart);
app.get('/api', routes.api);

app.post('/login', urlencoded, routes.postLog);
app.post('/signup', routes.postSign);



app.listen(3001);