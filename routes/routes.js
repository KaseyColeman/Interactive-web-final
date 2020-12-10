const nav = require('../nav');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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
exports.index = (req, res) => {
  res.render('index', {
    "title": "Login",
    "nav": nav
  });
};

exports.signup = (req, res) => {
  res.render('signup', {
    "title": "Create New Account",
    "nav": nav
  });
};

exports.chart = (req, res) => {
  res.render('chart', {
    "title": "Look at our cool chart",
    "nav": nav
  });
};

exports.profile = (req, res) => {
  User.find({ username: req.session.username }, (err, user) => {
    if (err) return console.error(err);
    res.render('profile', {
      "title": "Your Profile",
      "nav": nav,
      session: req.session,
      profileDetails: user
    });
  });
};

exports.edit = (req, res) => {
  res.render('edit', {
    "title": "Edit Your S###",
    "nav": nav
  });
};

exports.add = (req, res) => {
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
  res.redirect("/");

}

exports.postlog = (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, user) => {
    console.log(user);
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.redirect("/profile");
      //This is where session stuff should be. Nicole.
    } else {
      res.redirect("/");
    }
  });
}

exports.api=(req,res)=>{
  let WHY={
    "What is your favorite seaseon?":{"fall":0, "winter":0, "spring":0, "summer":0 }, 
    "What is the best color?":{"yellow":0, "red":0, "blue":0, "maroon":0},
    "What is your favorite genre?":{"horror":0, "romance":0, "comedy":0, "thriller":0 }
  }
  User.find((err, users)=>{
    users.forEach(user=>{
      WHY["What is your favorite seaseon?"][user.season]++
      WHY["What is the best color?"][user.color]++
      WHY["What is your favorite genre?"][user.genre]++
    })
    res.json(WHY);
  })

}


// let visited = 0;

let visited = 0;

exports.visited = (req, res, next) => {
  visited++;
  res.cookie('visited', visited, { maxAge: 99999999999999999 });
  if (req.cookies.beenToSiteBefore == 'yes') {
    // res.send(`You have been here ${req.cookies.visited} times`);
    next();
  } else {
    res.cookie('beenToSiteBefore', 'yes', { maxAge: 9999999999999 });
  }
};

// exports.getLastVisit = (req ,res, next) => {
//     if(req.session.visited) {
//         req.lastVisit = req.session.visited;
//     }
//     req.session.visited = Date.now();
//     res.send(`page last visited ${req.lastVisit}`);
//     next();
// }


/*------------------------------------------------------------------End Routes and Definition------------------------------------------------------------------------------*/
