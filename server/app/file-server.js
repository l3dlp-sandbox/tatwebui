/*global require,console,__dirname*/
(function() {
  'use strict';
  var config = require('./config.json');
  var extend = require('extend');
  var express = require('express');
  var http = require('http');
  var url = require('url');
  var app = express();

  app.get('/health', function(req, res) {
    res.send('tatwebui is alive');
  });

  app.get('/ping', function(req, res) {
    res.send('tatwebui ping OK');
  });

  app.get('/version', function(req, res) {
    res.send('tatwebui ' + config.version); 
  });

  app.get('/mon/status', function(req, res) {
    res.send('tatwebui monitoring ok');
  });

  // Filesystem
  app.use(new(require('./middlewares/filesystem-middleware.js'))({
    basePath: __dirname + '/..',
    public: {
      folder: 'public',
      default: 'index.html'
    },
    app: app
  }).middleware());

  module.exports = app;
})();
