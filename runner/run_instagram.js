const TWEET = require('../tweet/tweet_with_image.js');
const INSTAGRAM = require('../instagram/fetch_instagram.js');
const URL = 'https://www.instagram.com/accounts/login/?next=/angerme_official/';
const MONGO = require('../mongo/mongo.js');
const process = require('process');

function getTweetText(url) {
  return 'See this Instagram post by @angerme_upfront #ANGERME #アンジュルム \n' + url;
}

function tweet(x) {
  return new Promise(async function(resolve, reject) {
    var result = await MONGO.findInstagramResult({url: x.url});
    var willTweet = process.argv[2];
    if(result == null) {
      await MONGO.addInstagramResult({url: x.url});
      if(willTweet) {
        await TWEET.post(getTweetText(x.url), x.images);
      } else {
        console.log(new Date() + ' tweet was skipped by user.');
      }
    } else {
      console.log(new Date() + ' ' + x.url + ' was already tweeted');
    }
    resolve();
  });
}

(async() => {
    var instagrams = await INSTAGRAM.fetch(URL);
    var myPromise = Promise.resolve();
    for(var i of instagrams) {
      myPromise = myPromise.then(tweet.bind(this, i));
    }
})();
