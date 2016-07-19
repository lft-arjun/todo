var express = require('express');
var router = express.Router();

module.exports = {
    authorize: function(req, res, next) {
    	if (req.session && req.session.user === undefined) {
    		res.redirect('/users/login');
  		} else {
    		next();
  		}
    },
    admin: function(req, res, next) {
    	if (req.session && req.session.user === undefined) {
    		res.redirect('/users/login');
  		} else {
  			if (req.session && req.session.user !== undefined && req.session.user.role_id === 1) {
    			next();
  			}else {
  				res.redirect('/users/login');
  			}
  		}
    }
};

