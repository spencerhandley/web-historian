// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urls){
  urls.forEach(function(siteName) {
    if(siteName){
      console.log(siteName);
      request("http://"+siteName, function (err, res, body) {
        console.log(body)
        fs.writeFile("/Users/student/Desktop/2014-09-web-historian/archives/sites/" + siteName, body, function(err){
          if(err)throw err;
        });
      });
    }
  });
});

