const TWEET = require('../tweet/tweet_with_image.js');
const ELINE = require('../eline/fetch_eline.js');
const request = require('request');
const FIRESTORE = require('../firestore/firestore.js');
const fs = require('fs');
const process = require('process');
const ELINE_ANGERME_URL = 'https://www.elineupmall.com/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=%E3%82%A2%E3%83%B3%E3%82%B8%E3%83%A5%E3%83%AB%E3%83%A0&dispatch=products.search&page=';
const FINAL_PAGE = 3;

function getTweetText(x) {
  return '笠原桃奈ちゃんの新商品が発売されています #ANGERME #アンジュルム \n\n' + x.title + '\n' + x.url;
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
    var result = await FIRESTORE.findElineResult(x.url);
    var willTweet = process.argv[2];
    if(result == null) {
      await FIRESTORE.addElineResult(x);
      if(willTweet) {
        await TWEET.post(getTweetText(x), [ x.name ]);
      } else {
        console.log(new Date() + ' tweet was skipped by user.');
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already tweeted');
    }
    resolve();
  });
}

exports.run = async function() {
  var list = await ELINE.fetch(ELINE_ANGERME_URL, FINAL_PAGE);
  var myPromise = Promise.resolve();
  for(var x of list) {
    myPromise = myPromise.then(imageSave.bind(this, x)).then(tweet);
  }
}