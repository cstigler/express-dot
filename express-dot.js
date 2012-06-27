var fs = require('fs');
var path = require('path');
var doT = require('dot');

var _cache = {};

function _renderFile(locals, cb) {
  var template = _cache[filename];
  if (template) {
    return cb(null, template(locals));
  }

  return fs.readFile(filename, 'utf8', function(err, str){
    if (err) return cb(err);

    var locals = options;
    var template = doT.template(str);
    if (options.cache) _cache[filename] = template;
    return cb(null, template(locals));
  });
}

function renderWithLayout(template, locals, cb) {
  return _renderFile(locals, function(err, str) {
    if (err) return cb(err);

    var locals = options;
    locals.body = str;
    var str = template(locals);
    return cb(null, str);
  });
}

exports.__express = function(filename, options, cb) {
    var extension = path.extname(filename);

    if (options.layout !== undefined && !options.layout) return _renderFile(options, cb);

    var viewDir = options.settings.views;
    var layoutFileName = path.join(viewDir, options.layout || 'layout' + extension);

    var layoutTemplate = _cache[layoutFileName];
    if (layoutTemplate) return renderWithLayout(layoutTemplate, options, cb);

    return fs.readFile(layoutFileName, 'utf8', function(err, str) {
      if (err) return cb(err);

      var layoutTemplate = doT.template(str);
      if (options.cache) _cache[layoutFileName] = layoutTemplate;

      return renderWithLayout(layoutTemplate, options, cb);
    });
};