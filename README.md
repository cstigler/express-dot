express3-dot
============

doT stub for Express 3.x with caching and layout support. This an edited version with patial loading support.

## Install

Install original repository

```
$ npm install express-dot
```

or you can use my fork on github

```
$ npm install https://www.github.com/daraser/express-dot/tarball/master
```
Warnning not tested yet

##Setup

```
...

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

```

## Options

You can set up parts of rendering

```
...
res.render(
   '...', // current body template will be passed to layout template as {{=it.body}} 
   
   {
       // cache should be set to true in production enviroment.
       cache : false,
       // null - default behavior (will look for [viewDir]/layout.dot file; 
       // boolean - makes doT render without layout file, 
       // string path - looks for *.dot file to use for layout  
       layout : false,
       // any other data which you want to be exposed for the template by {{=it.<myParam>}}
       ... 
   }, 
   
   function(err, str_template){
       // callback
   }
);
...
```
## Globals

Globals are exposed as {{#def}} and {{= this}}. So anything you want to use globaly should be exposed.

```
...
doT.setGlobals({

   // set any function or property to be exposed in template
   ...,
   
   // global configuration
   // default is false, set true in production enviroment to cache partials 
   partialCache : false, 
   
   // reserved functionality will throw error if globals have 
   // load is reserved for partial loading. {{#def.load('/patials/sample.dot')}} it will load partial template from
   // __dirname + file path
   load : function(path ){ ... }
});
...
```



