
// Module dependencies.

var express = require('express')
  , routes = require('./routes')
  , auth = require('./routes/auth.js')
  , everyauth = require('everyauth')
  , http = require('http');

// Everyauth authentication module
everyauth.password
    .getLoginPath('/login') // Uri path to the login page
    .postLoginPath('/login') // Uri path that your login form POSTs to
    .loginView('index.ejs')
    .authenticate(function (login, password) {
        console.log('authenticating %s %s', login, password);
        var promise = this.Promise();
        auth.authenticate(login, password, function(err, user) {
            if (err) return promise.fulfill([err]);
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
        console.log(newUserAttributes);

        auth.addUser(newUserAttributes.login, newUserAttributes.password, function(err, user) {
            if (err) return promise.fulfill([err]);
            promise.fulfill(user);
        });

        return promise;

    })
    .registerSuccessRedirect('/tracker'); // Where to redirect to after a successful registration



var app = express();

// Asset pipeline
var assets = require('connect-assets')({build: true});
app.use(assets);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret hereAbc#96'));
  app.use(express.session());
  app.use(everyauth.middleware());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Getters
app.get('/', routes.index);
app.get('/meters', routes.meters);    
app.get('/my-profile', routes['my-profile']);   
app.get('/patterns', routes.patterns);
app.get('/tracker', routes.tracker);   
app.get('/user-profile', routes['user-profile']);   
app.get('/vent-stream', routes['vent-stream']);   
app.get('/vent', routes.vent);   
  
// Posts
app.post('/register', auth.register);

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
