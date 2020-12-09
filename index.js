const pug = require('pug');
const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyparse = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser('secret'));
let urlencoded = bodyparse.urlencoded({extended:true});

// app.all('*', routes.getLastVisit);

// app.get('/', routes.visited);

app.get('/', routes.index);
app.get('/signup', routes.signup);
app.get('/edit',routes.edit);
app.get('/chart', routes.chart);

app.post('/signup', routes.add);
app.post('/postlog', routes.postlog);



app.listen(3001);