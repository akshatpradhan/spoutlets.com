
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

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
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/meters', routes.meters);    
app.get('/my-profile', routes['my-profile']);   
app.get('/patterns', routes.patterns);   
app.get('/tracker', routes.tracker);   
app.get('/user-profile', routes['user-profile']);   
app.get('/vent-stream', routes['vent-stream']);   
app.get('/vent', routes.vent);   
  

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
