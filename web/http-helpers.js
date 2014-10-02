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
  var siteName = assetPath.slice(1);
  var newPath = archive.paths.archivedSites+assetPath;
  archive.isUrlInList(siteName, function(bool){
    console.log(bool, "BOOL")
    if(bool){
      console.log("!! is in url list") // undefined
      archive.isURLArchived(siteName, function(bool2){
        if(bool2){
          console.log("!! in Archived")
          serveAssets(req, res, newPath);
        } else {
          console.log("!! isn't archived")
          archive.addUrlToList(siteName);
          serveAssets(req, res, archive.paths.siteAssets + "/loading.html");
        }
      });
    } else{
      console.log('SHOULD NOT RUN');
      archive.addUrlToList(siteName);
      serveAssets(req, res, archive.paths.siteAssets + "/loading.html");
    }
  });
};
