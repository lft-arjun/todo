var models = require("../models");
var express = require('express');
var router = express.Router();



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
module.exports = router;
