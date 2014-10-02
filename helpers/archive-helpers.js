var fs = require('fs');
var path = require('path');
var _ = require('underscore');

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = readListOfUrls = function(callback){
  var sitesFilePath = paths.list;
  fs.readFile(sitesFilePath, function(err, data){
    if(err) throw err;
    var textString = data+'';
    var sitesArray = textString.split('\n');
    return callback(sitesArray);
  });
};

exports.isUrlInList = function(siteName, callback){
  readListOfUrls(function(sitesArray){
    console.log(sitesArray, "sitesArray");
    if (sitesArray.indexOf(siteName) !== -1) {
      console.log("Is in the URL list");
      callback(true);
    } else {
      console.log("Is not in the URL list");
      callback(false);
    }
  });
};

exports.addUrlToList = function(siteName){
  var sitesFilePath = paths.list;
  console.log(siteName, "sitename")
  var siteToInsert ='\n' + siteName ;
  fs.appendFile(sitesFilePath, siteToInsert, function(err){
    if(err) throw err
    console.log('File written with ' + siteName);
  });
};

exports.isURLArchived = function(siteName, callback){
  var siteFilePath = paths.archivedSites + "/"+siteName;
  fs.exists(siteFilePath, function(exists) {
    if (exists) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.downloadUrls = function(assetPath, callback){
  var absolutePathName = assetPath;
  fs.exists(absolutePathName, function(exists){
    if (exists) {
      fs.readFile(absolutePathName, function(err, data) {
        callback(data);
      });
    } else {
      console.log('error');
    }
  });
};
