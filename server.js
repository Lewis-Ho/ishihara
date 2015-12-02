// Init
var application_root = __dirname,
    express = require("express"),
    path = require("path");

// Express web server
var app        = express();
var bodyParser = require('body-parser');
var Game       = require('./models/game');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
//router.use(function(req, res, next) {
//    // do logging
//    console.log('Something is happening.');
//    next(); // make sure we go to the next routes and don't stop here
//});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/:data')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var game = new Game();      // create a new instance of the Bear model
        console.log("server Start");
        console.log(req.body);
        console.log(req.body.score);
        console.log("server End");
        game.round = req.body.round;  // set the bears name (comes from the request)
        game.score = req.body.score;
        game.age = req.body.age;
        game.is_color_blind = req.body.is_color_blind;

        // save the bear and check for errors
        game.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });

router.route('/Result').get(function(req, res) {
  console.log("in result");
  Game.find(function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
});

app.use('/Game', router);

//router.route('/Game')
//
//    // create a bear (accessed at POST http://localhost:8080/api/bears)
//    .post(function(req, res) {
//        
//        //var bear = new Bear();      // create a new instance of the Bear model
//        //bear.name = req.body.name;  // set the bears name (comes from the request)
//      //console.log(req.body);
//      res.json({ message: 'Bear created!' });
//        // save the bear and check for errors
////        bear.save(function(err) {
////            if (err)
////                res.send(err);
////
////            res.json({ message: 'Bear created!' });
////        });
//        
//    });


// set the view engine to ejs
app.set('view engine', 'jade');
app.use(express.static(__dirname));

// Route
app.get('/', function(req, res) {
  res.render('index.jade');
});

//app.get('/api/contacts', api.contacts);
//app.get('/api/contacts/:id', api.contact);
//app.post('/api/contacts', api.createContact);
//app.put('/api/contacts/:id', api.updateContact);
//app.delete('/api/contacts/:id', api.destroyContact);
//
//app.get('*', routes.index);

//app.get('/getangularusers', function (req, res) {
//	res.header("Access-Control-Allow-Origin", "http://localhost");
//	res.header("Access-Control-Allow-Methods", "GET, POST");
//	db.things.find('', function(err, users) {
//	if( err || !users) console.log("No users found");
//	  else 
//	{
//		res.writeHead(200, {'Content-Type': 'application/json'});
//		str='[';
//		users.forEach( function(user) {
//			str = str + '{ "name" : "' + user.username + '"},' +'\n';
//		});
//		str = str.trim();
//		str = str.substring(0,str.length-1);
//		str = str + ']';
//		res.end( str);
//	}
//  });
//});
//
//app.post('/insertangularmongouser', function (req, res){
//  console.log("POST: ");
//  res.header("Access-Control-Allow-Origin", "http://localhost");
//  res.header("Access-Control-Allow-Methods", "GET, POST");
//	//res.writeHead(200, {'Content-Type': 'text/plain'});
//  //user = req.body.username;
//  //passwd = req.body.password;
//  //emailid = req.body.email;
//  console.log(req.body);
//  console.log(req.body.mydata);
//  var jsonData = JSON.parse(req.body.mydata);
//  console.log(jsonData.username);
//  console.log(jsonData.password);
//  console.log(jsonData.email);
//
//  db.things.save({email: jsonData.email, password: jsonData.password, username: jsonData.username}, function(err, saved) {
//    if( err || !saved ) res.end( "User not saved"); 
//    else res.end( "User saved");
//  });
//});

var port = process.env.PORT || 3000;
app.listen(port);


// Database
/* prompt> */ var mongoose = require('mongoose');

/* prompt> */ mongoose.connect('mongodb://localhost/test', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

/////////////////