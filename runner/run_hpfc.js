const TWEET = require('../tweet/tweet.js');
const FC = require('../hello/fetch_fcnews.js');
const HP = require('../hello/fetch_hpnews.js');
const FIRESTORE = require('../firestore/firestore.js');
const process = require('process');
const hp_news_url = 'http://www.helloproject.com/news/';
const fc_news_url = 'https://www.up-fc.jp/helloproject/news.php';

function getTweetText(x) {
  return x.title + ' #ANGERME #アンジュルム \n' + x.url;
}

function tweet(x) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findHpFcResult(x.url);
    if(result == null) {
      var error = await TWEET.post(getTweetText(x));
      if(!error) {
        await FIRESTORE.addHpFcResult(x);
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already tweeted');
    }
    resolve();
  });
}

exports.run = async function() {
  var list = await HP.fetch(hp_news_url);
  list = list.concat(await FC.fetch(fc_news_url));
  var myPromise = Promise.resolve();
  for(var x of list) {
    myPromise = myPromise.then(tweet.bind(this, x));
  }
}