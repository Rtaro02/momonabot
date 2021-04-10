const fetch_ameba = require('./fetch_ameba');
const request = require('request');
const confirm_include_momona_name = require('../util/util.js').confirm_include_momona_name;

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

exports.check_momona_existence = async function(url) {
  var result = (await doRequest(url)).replace(/\n/g, '').replace(/^.*(<article.*<\/article>).*$/, '$1');
  return confirm_include_momona_name(result);
};

exports.fetch_other_members = async function(url) {
  var blog = await fetch_ameba.fast_fetch(url);
  var is_include = await module.exports.check_momona_existence(blog.url);
  if(is_include) {
    console.log(new Date() + ' There are momona episode! in ' + blog.title);
    return blog;
  } else {
    console.log(new Date() + ' There are no episode in ' + blog.title);
    return null;
  }
}