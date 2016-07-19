/**
 * Created by linux on 7/19/16.
 */
var express = require('express');
var router = express.Router();

module.exports = {
    user: function(req, res, next) {
        if (req.session && req.session.user === undefined) {
            return false
        } else {
            return req.session.user;
        }
    },
};