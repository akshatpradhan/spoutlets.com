'use strict';
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.logout = function(req, res) {
    res.session.destroy();
    res.redirect('/');
};


exports.meters = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else    
        res.render('meters.ejs');
};

exports['my-profile'] = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else
        res.render('my-profile.ejs');
};

exports.patterns = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else    
        res.render('patterns.ejs');
};

exports.tracker = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else {
       res.render('tracker.ejs'); 
    }
        
};

exports['user-profile'] = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else
        res.render('user-profile.ejs');
};

exports.vent = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else    
        res.render('vent.ejs');
};
