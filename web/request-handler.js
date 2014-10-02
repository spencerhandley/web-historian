var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers.js');

var routes = {
  '/': function(req, res){
    helpers.serveAssets(req, res, archive.paths.siteAssets + '/index.html', function(asset){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(asset + '');
      res.end();
    });
  }
};
var methods = {
  'GET': function(req, res){
    var assetPath = url.parse(req.url).pathname;

    if (routes[assetPath]) {
      routes[assetPath](req, res);
    }
  },
  'POST': function(req, res){
    var assetPath = url.parse(req.url).pathname;
    helpers.handleURLQueries(req, res, assetPath);
  }
};
exports.handleRequest = handleRequest = function (req, res) {
  if (req.method === 'GET') {
    methods['GET'](req, res);
  } else if (req.method === 'POST') {
    methods['POST'](req, res);
  }
};
