'use strict';

var vent = require("../lib/vent");
var numVents = 3;

exports['/api/vents'] = function(req, res){
    if (undefined === req.user) {
        res.redirect('/');
    }
    else {
        vent.getRecentVents(numVents, function(err, vents) {
            res.send(JSON.stringify(vents)); 
        });        
        
    }
         
};
