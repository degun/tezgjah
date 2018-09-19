// app/routes.js

module.exports = function(app, passport) {
	//home
	app.get('/', function(req, res) {
		res.render('index.html'); // load the index.html file
	});

	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.html', { message: req.flash('loginMessage') });
	});
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/shkrime', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.html', { message: req.flash('signupMessage') });
	});


	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/shkrime', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

 // main hall
	app.get('/shkrime', isLoggedIn, function(req, res) {
		res.render('shkrime.html', {
			user : req.user // get the user out of session and pass to template
		});
	});

    app.get('/ri', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('ri.html', { user: req.user });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    app.get('/admin', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('admin.html', { user: req.user });
	});

// tregim ROUTES

	var mysqlModel = require ('mysql-model');

	var Tezgjah = mysqlModel.createConnection({
	  host: 'localhost',
	  user: 'froot',
	  password: 'loop',
	  database: 'tezgjah'
	});

	var Tregim = Tezgjah.extend({
	  tableName: 'paragraf'
	});

	tregim = new Tregim();


	app.get('/tregime', function(req, res) {
		tregim.find(function(err, docs) {
			docs.forEach(function(item) {
				console.log("Received a GET request for id: " + item.id);
			});
			res.send(docs);
		});
	});


	app.post('/tregime', function(req, res) {
		console.log('Received a POST request which has:');
		for (var key in req.body) {
			console.log(key + ': ' + req.body[key]);
		}
		var trego = new Tregim(req.body);
		trego.save(function(err, doc) {
			res.send(doc);
		});
	});

	app.delete('/tregime/:id', function(req, res) {
		console.log('Received a DELETE request for id: ' + req.params.id);
		tregim.remove('id='+req.params.id+'', function(err, doc) {
			res.send({id: req.params.id});
		});
	});

	app.put('/tregime/:id', function(req, res) {
		console.log('Received an UPDATE request for id: ' + req.params.id);
        var tregi = new Tregim(req.body);
        tregi.save(function(err, doc) {
			res.send(doc);
		});
	});


};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
