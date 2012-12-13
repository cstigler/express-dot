var express = require('express');
var app = express();

// load express doT
var doT = require('express-dot');

app.configure(function() {

  // set views folder
  app.set('views', __dirname);

  // doT engine
  app.set('view engine', 'dot' );
  app.engine('dot', doT.__express );

});

// respond
app.get('/', function(req, res, next){
  // you need to have in views folder
	res.render('index', { });
});

app.listen(3000);
