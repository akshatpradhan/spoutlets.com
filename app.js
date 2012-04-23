// Module dependencies.

var express = require('express')
    , routes = require('./routes')
    , posts = require('./routes/posts')
    , auth = require('./routes/auth')
    , vents = require('./routes/vents')
    , ventStream = require('./routes/vent-stream')
    , everyauth = require('everyauth')
    , http = require('http');

// Access user
var userHash = {};

// To be mongo-fied
everyauth.everymodule.findUserById(function (userId, callback) {
    console.log('finding user: ' + userId);
    callback(null, userHash[userId]);
});

// Everyauth authentication module
everyauth.password
    .getLoginPath('/login') // Uri path to the login page
    .postLoginPath('/login') // Uri path that your login form POSTs to
    .loginView('index.ejs')
    .authenticate(function (login, password) {
        var promise = this.Promise();
        auth.authenticate(login, password, function(err, user) {
            if (err) return promise.fulfill([err]);
            userHash[user._id] = user;
            promise.fulfill(user);
        });
        return promise;
    })
    .loginSuccessRedirect('/tracker') // Where to redirect to after a login

    // If login fails, we render the errors via the login view template,
    // so just make sure your loginView() template incorporates an `errors` local.
    // See './example/views/login.jade'

    .getRegisterPath('/register') // Uri path to the registration page
    .postRegisterPath('/register') // The Uri path that your registration form POSTs to
    .registerView('a string of html; OR the name of the jade/etc-view-engine view')
    .validateRegistration(function (newUserAttributes) {
        return null; // success
        // Validate the registration input
        // Return undefined, null, or [] if validation succeeds
        // Return an array of error messages (or Promise promising this array)
        // if validation fails
        //
        // e.g., assuming you define validate with the following signature
        // var errors = validate(login, password, extraParams);
        // return errors;
        //
        // The `errors` you return show up as an `errors` local in your jade template
    })
    .registerUser( function (newUserAttributes) {

        var promise = this.Promise();
       // console.log(newUserAttributes);

        auth.addUser(newUserAttributes.login, newUserAttributes.password, function(err, user) {
            if (err) return promise.fulfill([err]);
            console.log('registered');
            promise.fulfill(user);
            
            // Allow the user to immediately sign in by storing
            userHash[user._id] = user;
        });

        return promise;

    })
    .registerSuccessRedirect('/tracker'); // Where to redirect to after a successful registration

var app = express.createServer(
    express.bodyParser()
    , express.static(__dirname + "/public")
    , express.favicon()
    , express.cookieParser()
    , express.session({ secret: 'ht#Z$uayreve'})
    , everyauth.middleware()
);

// View helpers
everyauth.helpExpress(app, { userAlias: 'myUser' });

// Configuration

app.configure(function () {
    app.use(express.logger('dev'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src:__dirname + '/public' }));
    //app.use(express.cookieParser('your secret hereAbc#96'));
   // app.use(express.session({secret:'ereAbc#9'}));
});

// Asset pipeline
var assets = require('connect-assets')({build: true});
app.use(assets);

// No layout for now
app.set('view options', {
    layout: false
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Getters
app.get('/', routes.index);
app.get('/api/vents', vents['/api/vents']);
app.get('/logout', routes.logout);
app.get('/meters', routes.meters);
app.get('/my-profile', routes['my-profile']);
app.get('/patterns', routes.patterns);
app.get('/tracker', routes.tracker);
app.get('/user-profile', routes['user-profile']);
app.get('/vent-stream', ventStream['vent-stream']);
app.get('/vent', routes.vent);

// Posts
app.post('/tracker', posts.tracker);
app.post('/vent-stream', ventStream['vent-stream-post']);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
