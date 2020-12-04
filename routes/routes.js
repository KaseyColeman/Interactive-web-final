const nav = require('../nav');

var connectionString = 'mongodb+srv://guest:Vault159@cluster0.2ximt.mongodb.net/test';

exports.index = (req, res) => {
    res.render('index', {
      "title": "Login",
      "nav":nav
    });
  };
  
exports.signup = (req, res) => {
    res.render('signup', {
      "title": "Create New Account",
       "nav":nav
    });
  };

  exports.chart = (req, res) => {
    res.render('chart', {
      "title": "Look at our cool chart",
       "nav":nav
    });
  };
  
  exports.edit = (req, res) => {
    res.render('edit', {
      "title": "Edit Your Shit",
       "nav":nav
    });
  };
let timesVisited = 0;

exports.visited = (req, res) => {
      timesVisited++;
      res.cookie('times_visited', timesVisited, {maxAge: 111144446666});
      if(req.cookies.beenToSiteBefore == 'yes') {
          console.log(`page had been visited ${req.cookies.visited}`);
      } else {
          res.cookies('beenToSiteBefore', 'yes', {maxAge: 11114444666});
          console.log('first timer, coo');
      }
}

exports.getLastVisit = (req ,res, next) => {
    if(req.session.visited) {
        req.lastVisit = req.session.visited;
    }
    req.session.visited = Date.now();
    res.send(`page last visited ${req.lastVisit}`);
    next();
}