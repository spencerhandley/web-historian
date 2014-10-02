var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(callback){
  var sitesFilePath = paths.list;
  console.log(sitesFilePath, "Sites file path");
  fs.readFile(sitesFilePath, function(err, data){
    if(err) throw err;
    var textString = data+'';
    var sitesArray = textString.split('\n');
    console.log(sitesArray, "sites array in read list");
    callback(sitesArray);
  });
};

exports.isUrlInList = function(siteName){
  var sitesArray = readListOfUrls(function(sitesArray){
    if (sitesArray.indexOf(siteName) !== -1) {
      console.log("Is in the URL list");
      return true;
    } else {
      console.log("Is not in the URL list")
      return false;
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

exports.isURLArchived = function(siteName){
  var siteFilePath = paths.archivedSites + siteName;

  fs.exists(siteFilePath, function(exists) {
    if (exists) {
      return true;
    } else {
      return false;
    }
  });
};

exports.downloadUrls = function(assetPath, callback){
  var absolutePathName = assetPath;
  console.log(absolutePathName, "absolutePathName")
  fs.exists(absolutePathName, function(exists){
    if (exists) {
      fs.readFile(absolutePathName, function(err, data) {
        callback(data);
      });
    } else {
      console.log('error');
      // throw an error
    }
  });
};
