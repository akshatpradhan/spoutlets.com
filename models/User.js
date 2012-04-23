/**
 * User model
 * @author Don Nguyen
 */

var db = require('../lib/db');

var Schema = new db.Schema({
    username    : {type: String, unique: true}
    , password    : String
});

// Exports
module.exports = db.mongoose.model('User', Schema);