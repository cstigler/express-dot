express3-dot
============

doT stub for Express 3.x with caching and layout support

Install
============

npm install express-dot

or you can use my fork on github;


Setup
============

// load express doT
var doT = require('express-dot');

// (optional) set globals any thing you want to be exposed by this in {{= }} and in def {{# }}
doT.setGlobals({ ... });

// setup rendering

app.configure(function() {

  ...

  // set views folder
  app.set('views', __dirname + '/views');

	// doT engine
	app.set('view engine', 'dot' );
	app.engine('dot', doT.__express );
	
  ...
	
});

app.get('/', function(req, res){
  // you need to have in views folder
  res.render('index', { });
})


