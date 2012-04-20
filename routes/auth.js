var crypto = require('crypto');
var User = require('../models/User');

// Can improve down the line by making unique per user
var salt = "f#@Xu^%Hg*YBCs";

exports.addUser = addUser;
exports.encrypt = encrypt;
exports.getUser = getUser;
exports.removeUser = removeUser;

exports.register = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    addUser(username, password, function(err, user) {
        res.redirect('/tracker');
    });
}

// Add user to database
function addUser(username, password, callback) {

    var encrypted = encrypt(password, salt);

    var instance = new User();
    instance.username = username;
    instance.password = encrypted;

    instance.save(function (err) {
        if (err) {
            callback(err);
        }
        else {
            console.log('user saved', username, password);
            callback(null, instance);
        }

    });

}

// Used to generate a hash of the plain-text password + salt
function encrypt(msg, key) {
    return crypto
        .createHmac('sha256', key)
        .update(msg)
        .digest('hex');
}

// Retrieve user, null for non-existent
function getUser(username, callback) {
    console.log('ret');
    User.findOne({'username': username}, function(err, doc) {
        if (err) {
            callback(err);
        }
        else
            callback(null, doc);
    });
}

// Remove user
function removeUser(username, callback) {
    User.findOne({'username': username}, function(err, doc) {
        if (err) {
            callback(err);
        }
        else {
            if (null == doc) callback(err);
            else {
                doc.remove(function(err) {
                    callback(err);
                });
            }

        }
    });
}
