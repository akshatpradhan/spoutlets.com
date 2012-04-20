
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.meters = function(req, res) {
    res.render('meters.ejs');
};

exports['my-profile'] = function(req, res) {
    res.render('my-profile.ejs');
}

exports.patterns = function(req, res) {
    res.render('patterns.ejs');
};

exports.tracker = function(req, res) {
    //console.log(everyauth);
    console.log(req.loggedIn);
    console.log(req.user);
    res.render('tracker.ejs');
};

exports['user-profile'] = function(req, res) {
    res.render('user-profile.ejs');
};

exports['vent-stream'] = function(req, res) {
    res.render('vent-stream.ejs');
};

exports.vent = function(req, res) {
    res.render('vent.ejs');
};
