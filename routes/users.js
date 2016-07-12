var express = require('express');
var router = express.Router();
var config = require('../configs/database');
var database = mysql.createConnection(config);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/detail/:id', function(req, res, next) {
	console.log(database.connect());
  res.send(req.params.id);
});
module.exports = router;
