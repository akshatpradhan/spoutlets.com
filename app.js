
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/meters', function(req, res) {
    res.render('meters.ejs');
});    
app.get('/my-profile', function(req, res) {
    res.render('my-profile.ejs');
});   
app.get('/patterns', function(req, res) {
    res.render('patterns.ejs');
});   
app.get('/tracker', function(req, res) {
    res.render('tracker.ejs');
});   
app.get('/user-profile', function(req, res) {
    res.render('user-profile.ejs');
});   
app.get('/vent-stream', function(req, res) {
    res.render('vent-stream.ejs');
});   
app.get('/vent', function(req, res) {
    res.render('vent.ejs');
});   
  

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
