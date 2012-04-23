/**
 * Stream model
 * @author Don Nguyen
 */

var db = require('../lib/db');

var Schema = new db.Schema({
    text      : String
});

// Exports
module.exports = db.mongoose.model('Stream', Schema);