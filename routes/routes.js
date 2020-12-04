const nav = require('../nav');
const mongoose = require.('mongoose');
mongoose.Promise = global.Promise;

var connectionString = 'mongodb+srv://guest:Vault159@cluster0.2ximt.mongodb.net/test';

mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

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