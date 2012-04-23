/**
 * Vent model
 * @author Don Nguyen
 */

var db = require('../lib/db');

var Schema = new db.Schema({
    username        : String
    , text      : String
    , stream    : String
});

// Exports
module.exports = db.mongoose.model('Vent', Schema);