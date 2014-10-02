var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = serveAssets = function(req, res, assetPath) {

  archive.downloadUrls(assetPath, function(data){
    res.writeHead(200);
    res.write(data + '');
    res.end();
  });
};

exports.handleURLQueries = handleURLQueries = function(req, res, assetPath){
  console.log("handling url Query")
  var siteName = assetPath.slice(1);
  var newPath = archive.paths.archivedSites+assetPath
  if(archive.isUrlInList(siteName) && isURLArchived(siteName)){
    console.log("url is in list ")
    serveAssets(req, res, newPath);
  } else {
    archive.addUrlToList(siteName)
    serveAssets(req, res, archive.paths.siteAssets + "/loading.html");

    // htmlFetcher.fetchSite(siteName, function(html) {
    //   console.log(html);
    //   htmlFetcher.addToSitesFolder(siteName, html);
    // });
    // archive.addUrlToList(siteName);
  }
};



// As you progress, keep thinking about what helper functions you can put here!
