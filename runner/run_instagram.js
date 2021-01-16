const TWEET = require('../tweet/tweet_with_image.js');
const INSTAGRAM = require('../instagram/fetch_instagram.js');
const URL = 'https://www.instagram.com/accounts/login/?next=/angerme_official/';
const FIRESTORE = require('../firestore/firestore.js');
const process = require('process');

function getTweetText(url) {
  return 'See this Instagram post by @angerme_upfront #ANGERME #アンジュルム \n' + url;
}

function tweet(x) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findInstagramResult(x.url);
    if(result == null) {
      var error = await TWEET.post(getTweetText(x.url), x.images);
      if(error) {
        await FIRESTORE.addInstagramResult({url: x.url});
      }
    } else {
      console.log(new Date() + ' ' + x.url + ' was already tweeted');
    }
    resolve();
  });
}

exports.run = async function() {
  var instagrams = await INSTAGRAM.fetch(URL);
  var myPromise = Promise.resolve();
  for(var i of instagrams) {
    myPromise = myPromise.then(tweet.bind(this, i));
  }
}