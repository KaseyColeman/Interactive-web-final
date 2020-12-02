const nav = require('../nav');

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