/**
 * Connect to persistence layer
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.disconnect = disconnect;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
var username = "spoutlets"
var password = "b6Yb61b93bd";
connect();

// Connect to mongo
//function connect() {mongoose.connect('mongodb://' + username + ':' + password + '@ds031857.mongolab.com:31857/spoutlets')}
function connect() {mongoose.connect('mongodb://localhost/spoutlets');}
function disconnect() {mongoose.disconnect()}