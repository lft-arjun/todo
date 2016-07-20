var models = require("../models");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require("../middleware/authentication");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/detail/:id',[ middleware.authorize, middleware.admin] ,function(req, res, next) {
	models.Page.findAll().then(function(pages) {
  		res.render('pages/index', { pages: pages });
  	});
});

router.get('/edit/:id', middleware.authorize, function(req, res, next) {
	res.send('edit page');
});
//register display form
router.get('/register', middleware.authorize, function(req, res, next) {
    var roles =[];
    models.roles.all().success(function (result) {
        res.render('users/register', {errors: '', data: '', roles: result});
    });

});
//save register post data into database
router.post('/register', middleware.authorize, function(req, res, next) {
	if (!req.body) return res.sendStatus(400);

	var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var password = req.body.password;
    var role = req.body.role;
    var profile_pic = req.body.profile_pic;

    var postData = {
    	name,
    	email,
    	address,
        role
    };

  req.checkBody("name", "Enter a name.").notEmpty();
  req.checkBody("password", "Enter a password.").notEmpty();
  req.checkBody("address", "Enter a address.").notEmpty();
  req.checkBody("email", "Enter a valid email address.").isEmail();


  var errors = req.validationErrors();
  if (errors) {
      models.roles.all().success(function (result) {
          res.render('users/register', {errors: errors , data: postData, roles: result});
      });

      return;
  } else {
     models.users.findOne({where: {email: email},}) .success(function (result) {
            if(result) {
                req.flash('message', 'Email already registered!')
                res.redirect('/users/register');
            }
     });
  	// res.send(name + req.body.profile_pic);
  	var encryptedPass = bcrypt.hashSync(req.body.password, 10);

  	models.users.create({
  		'name': name,
  		'email' : email,
  		'password': encryptedPass,
  		'address': address,
  		'role_id': role ? role : 3

  	}).then(function(response){
  		req.flash('message', 'User successfully register!')
  		res.redirect('/users/list');
  	})
  	.error(function(){

  	})

  	// res.send(encryptedPass)
    // normal processing here
  }
});
router.get('/list', middleware.authorize,  function(req, res, next) {
	// models.users.findAll(function(){

	// }).then(function() {

	// return done(null, false, req.flash('message', 'Oops! Wrong password.'));
	// });
	res.render('users/list', {data: '',  message: req.flash('message') });
});

router.get('/login', function(req, res) {
        if (req.session && req.session.user !== undefined) {
            req.flash('message', 'Already logged in!');
            res.redirect('/admins/dashboard');
        }
        // render the page and pass in any flash data if it exists
       var message = req.flash('message');
        res.render('users/login', {email: '', errors: '', message: message }); 
 });
router.post('/login', function(req, res, next) {
    var email = req.body.email;
	var password = req.body.password;
	
  	req.checkBody("email", "Enter a valid email address.").notEmpty();
  	req.checkBody("email", "Enter a valid email address.").isEmail();
	req.checkBody("password", "Enter valid password.").notEmpty();
	var errors = req.validationErrors();
  if (errors) {
    res.render('users/login', {errors: errors , email: email, message:''});
    return;
  } else {
    models.users.findOne({where: {email: email},}).then(function(data) {
      var user = data;
      
      if(user === null) {
      	req.flash('message', 'Invalid username or password')
        res.redirect('/users/login');
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
         	req.flash('message', 'Invalid username or password')
            res.redirect('/users/login');
         } else {
         	req.session.user = user;
            res.redirect('/admins/dashboard');
         }
      }
   });
	}

 });

router.get('/logout', middleware.authorize, function(req, res, next){
	// if(req.session && req.session.user === undefined) {
 //      notFound404(req, res, next);
 //   } else {
      req.session.destroy();
      res.redirect('/users/login');
   // }
});


var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};


module.exports = router;
