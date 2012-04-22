/**
 * Tag schema
 * @author Don Nguyen
 */

var db = require('../lib/db');
var Schema = new db.Schema({
    tagName    : {type: String, unique: true}
});

// Exports
module.exports = db.mongoose.model('Tag', Schema);