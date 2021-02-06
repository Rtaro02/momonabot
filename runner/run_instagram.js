const TWEET = require('../tweet/tweet_with_image.js');
const INSTAGRAM = require('../instagram/fetch_instagram.js');
const URL = 'https://www.instagram.com/angerme_official/';
const FIRESTORE = require('../firestore/firestore.js');
const request = require('request');
const fs = require('fs');

function getTweetText(x) {
  return x.sentence + '...\n #ANGERME #アンジュルム \n' + x.url;
}

function imageSave(x) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: x.image_url, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(x.image_name, body, 'binary');
        }
        resolve(x);
      });
  });
}

function tweet(x) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findInstagramResult(x.url);
    if(result == null) {
      var error = await TWEET.post(getTweetText(x), [ x.image_name ]);
      if(!error) {
        await FIRESTORE.addInstagramResult(x);
      }
    } else {
      console.log(new Date() + ' ' + result.url + ' was already tweeted');
    }
    resolve();
  });
}

exports.run = async function() {
  var instagrams = await INSTAGRAM.fetch(URL, 3);
  var myPromise = Promise.resolve();
  for(var x of instagrams) {
    myPromise = myPromise.then(imageSave.bind(this, x)).then(tweet);
  }
}