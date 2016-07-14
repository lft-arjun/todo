var models = require("../models");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/detail/:id', function(req, res, next) {
	models.Page.findAll().then(function(pages) {
    	// console.log(pages);
  		// res.send(pages);
  		res.render('pages/index', { pages: pages });
  	});
});

router.get('/edit/:id', function(req, res, next) {
	res.send('edit page');
});
//register display form
router.get('/register', function(req, res, next) {
	res.render('users/register', {errors: '', data: ''});
});
//save register post data into database
router.post('/register', function(req, res, next) {
	if (!req.body) return res.sendStatus(400);
	console.log(req.is('json'));
	var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var password = req.body.password;

    var postData = {
    	name,
    	email,
    	address
    };

  req.checkBody("name", "Enter a name.").notEmpty();
  req.checkBody("password", "Enter a password.").notEmpty();
  req.checkBody("address", "Enter a address.").notEmpty();
  req.checkBody("email", "Enter a valid email address.").isEmail();

  var errors = req.validationErrors();
  if (errors) {
    res.render('users/register', {errors: errors , data: postData});
    return;
  } else {
  	var encryptedPass = bcrypt.hashSync(req.body.password, 32);

  	res.send(encryptedPass)
    // normal processing here
  }
});
module.exports = router;
