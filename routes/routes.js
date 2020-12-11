const nav = require('../nav');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
let cookie;
mongoose.Promise = global.Promise;

/*---------------------------------------------------------------Mongo Connection/Schema------------------------------------------------------------------------------*/

var connectionString = 'mongodb+srv://guest:Vault159@cluster0.2ximt.mongodb.net/test';

mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => { });

let UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: String,
  season: String,
  color: String,
  genre: String
});

let User = mongoose.model('User_Collection', UserSchema);



/*---------------------------------------------------------------End Mongo Connection/Schema------------------------------------------------------------------------------*/
/*------------------------------------------------------------------Routes and Defantition------------------------------------------------------------------------------*/
exports.checkAuth = (req, res, next) => {
    User.find({username: req.session.username}, (err, user) => {
        if (!(req.session.user && req.session.user.authenticated) || err) {
            res.redirect("/login");
            return console.error(err);
        }
           next();
    });
}

exports.login = (req, res) => {
    res.render('login', {
      "title": "Login",
      "nav":nav,
      "cookie":cookie
    });
  };

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {res.redirect('/login');}
    });
}
  
exports.signup = (req, res) => {
    res.render('signup', {
      "title": "Create New Account",
       "nav":nav
    });
  };

exports.chart = (req, res) => {
  res.render('chart', {
      "nav":nav,
      "title": "Daang look at these charts!"

  });
};


exports.profile =(req, res) => {
    User.find({username: req.session.user.username},(err, user) => {
      if (err) return console.error(err);
      res.render('profile', {
        "title": "Your Profile",
        "nav": nav,
        session: req.session,
        profileDetails: user
      })
    });
    
    // console.log(req.body.session);
};
  
exports.edit = (req, res) => {
  User.find({username: req.session.user.username},(err, user) => {
    if (err) return console.error(err);
    console.log(user);
    res.render('edit', {
      "title": "Your Profile",
      "nav": nav,
      "session": user
    })
  });

};

exports.updateProfile = async (req, res) => {

  var body = req.body;
  let hash = bcrypt.hashSync(req.body.updatedPassword, 10)
  var updatedData = {
    username: req.body.updatedUsername,
    password: hash,
    email: req.body.updatedEmail,
    age: req.body.updatedAge,
    season: req.body.q1,
    color: req.body.q2,
    genre: req.body.q3
  }

  await User.findOneAndUpdate({"username": req.session.user.username}, updatedData);
  
  req.session.destroy(err => {
    if (err) {
        console.log(err);
    } else {res.redirect('/login');}
});

}

exports.postSign = (req, res) => {
  console.log(req.body)
  let hash = bcrypt.hashSync(req.body.password, 10)
  let user = new User({
    username: req.body.username,
    password: hash,
    email: req.body.email,
    age: req.body.age,
    season: req.body.q1,
    color: req.body.q2,
    genre: req.body.q3
  });
  user.save();
  res.redirect("/login");
}

  exports.postLog = (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username }, (err, user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = {
                authenticated: true,
                username: req.body.username
            }
            res.redirect("/profile");
        } else { res.redirect("/login"); }
    });
  }
  /*--------------- api start -----------   */

exports.api=(req,res)=>{
    let WHY={
        "What is your favorite season?":{"fall":0, "winter":0, "spring":0, "summer":0 },
        "What is the best color?":{"yellow":0, "red":0, "blue":0, "maroon":0},
        "What is your favorite genre?":{"horror":0, "romance":0, "comedy":0, "thriller":0 }
    }
    User.find((err, users)=>{
        users.forEach(user=>{
            WHY["What is your favorite season?"][user.season]++
            WHY["What is the best color?"][user.color]++
            WHY["What is your favorite genre?"][user.genre]++
        })
        res.json(WHY);
    })

}

/*--------------- api end -----------   */
/*--------------- cookies start -----------   */
let visited = 0;

exports.visited = (req, res, next) => {
    visited++;
    let date = new Date();
    date.toLocaleString("en-US");
    cookie = "PAGE LAST VISITED ON " + req.cookies['visited'];
    res.cookie('visited', date.toLocaleString("en-US"), {maxAge: 99999999999999999});
    next();
};

exports.checkLog = (req, res, next) => {
    if(req.session.user) {
        res.redirect("/profile");
        return;
    }
    next();
}



/*--------------- cookies end -----------   */

/*------------------------------------------------------------------End Routes and Definition------------------------------------------------------------------------------*/
