const nav = require('../nav');
const mongoose = require('mongoose');
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
mdb.once('open', callback => {});

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

  exports.add = (req, res) => {
    console.log(req.body)
    let user = new User({
      username:req.body.username,
      password:req.body.password,
      email:req.body.email,
      age:req.body.age,
      season:req.body.q1,
      color:req.body.q2,
      genre:req.body.q3
    })
    user.save();
    res.redirect("/");
    
   }



let timesVisited = 0;

// exports.visited = (req, res) => {
//       timesVisited++;
//       res.cookie('times_visited', timesVisited, {maxAge: 111144446666});
//       if(req.cookies.beenToSiteBefore == 'yes') {
//           console.log(`page had been visited ${req.cookies.visited}`);
//       } else {
//           res.cookies('beenToSiteBefore', 'yes', {maxAge: 11114444666});
//           console.log('first timer, coo');
//       }
// }

// exports.getLastVisit = (req ,res, next) => {
//     if(req.session.visited) {
//         req.lastVisit = req.session.visited;
//     }
//     req.session.visited = Date.now();
//     res.send(`page last visited ${req.lastVisit}`);
//     next();
// }


/*------------------------------------------------------------------End Routes and Defantition------------------------------------------------------------------------------*/ 