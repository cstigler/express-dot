var fs = require('fs');
var path = require('path');
var doT = require('dot');
var async = require('async');

var _cache = {};
var _globals = {};

function _renderFile(filename, options, cb) {
  'use strict';
  cb = (typeof cb === 'function') ? cb : function () {};

  var template = _cache[filename];
  if (template) {
    return cb(null, template.call(_globals, options));
  }

  return fs.readFile(filename, 'utf8', function (err, str) {
    if (err) return cb(err);

    var template = doT.template(str, null, _globals);
    if (options.cache) _cache[filename] = template;
    return cb(null, template.call(_globals, options));
  });
}

function _renderWithLayout(filename, layoutTemplate, options, cb) {
  'use strict';
  cb = (typeof cb === 'function') ? cb : function () {};

  return _renderFile(filename, options, function (err, str) {
    if (err) return cb(err);
    options.body = str;
    return cb(null, layoutTemplate.call(_globals, options));
  });
}

exports.setGlobals = function(globals) {
  'use strict';
  _globals = globals;
};

exports.__express = function(filename, options, cb) {
    'use strict';
    cb = (typeof cb === 'function') ? cb : function () {};
    var extension = path.extname(filename);

    if (options.layout !== undefined && !options.layout) return _renderFile(filename, options, cb);

    var viewDir = options.settings.views;
    var layoutFileName = path.join(viewDir, options.layout || 'layout' + extension);

    var layoutTemplate = _cache[layoutFileName];
    if (layoutTemplate) return _renderWithLayout(filename, layoutTemplate, options, cb);

    return fs.readFile(layoutFileName, 'utf8', function (err, str) {
      if (err) return cb(err);

      var layoutTemplate = doT.template(str, null, _globals);
      if (options.cache) _cache[layoutFileName] = layoutTemplate;

      return _renderWithLayout(filename, layoutTemplate, options, cb);
    });
};