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