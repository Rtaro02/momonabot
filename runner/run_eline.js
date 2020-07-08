const TWEET = require('../tweet/tweet_with_image.js');
const ELINE = require('../eline/fetch_eline.js');
const MONGO = require('../mongo/mongo.js');
const request = require('request');
const fs = require('fs');

function getTweetText(x) {
  return "笠原桃奈ちゃんの新商品が発売されています\n\n" + x.title + '\n' + x.url;
}

function imageSave(x) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: x.image, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(x.name, body, 'binary');
        }
        resolve(x);
      });
  });
}

function tweet(x) {
  return new Promise(async function(resolve, reject) {
    var result = await MONGO.findElineResult(x);
    if(result == null) {
      await MONGO.addElineResult(x);
      await TWEET.post(getTweetText(x), [ x.name ]);
    } else {
      console.log("Already Tweeted");
      console.log(result);
    }
    resolve();
  });
}

(async() => {
    var list = await ELINE.fetch();
    console.log(list);
    var myPromise = Promise.resolve();
    for(var x of list) {
      myPromise = myPromise.then(imageSave.bind(this, x)).then(tweet);
    }
})();
