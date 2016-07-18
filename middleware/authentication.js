var express = require('express');
var router = express.Router();

// var authorize = function authorize (req, res, next) {
// 	console.log(req.session.user);
//   if (req.session && req.session.user === undefined) {
//     res.redirect('/users/login');
//   } else {
//     next();
//   }
// };
module.exports = {
    authorize: function(req, res, next) {
    	if (req.session && req.session.user === undefined) {
    		res.redirect('/users/login');
  		} else {
    		next();
  		}
    },
    admin: function() {
    	if (req.session && req.session.user === undefined) {
    		res.redirect('/users/login');
  		} else {
  			if (req.session && req.session.user === undefined && req.session.user.role_id === 1) {
    			next();
  			}else {
  				res.redirect('/users/login');
  			}
  		}
    }
};

