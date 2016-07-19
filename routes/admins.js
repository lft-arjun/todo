var models = require("../models");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require("../middleware/authentication");

router.get('/dashboard',[ middleware.authorize, middleware.admin], function(req, res, next) {
    res.render('admins/dashboard');
});

module.exports = router;