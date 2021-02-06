const TWEET = require('../tweet/tweet_with_image.js');
const INSTAGRAM = require('../instagram/fetch_instagram.js');
const URL = 'https://www.instagram.com/angerme_official/';
const FIRESTORE = require('../firestore/firestore.js');
const confirm_include_momona_name = require('../util/util.js').confirm_include_momona_name;
const request = require('request');
const fs = require('fs');

function getTweetText(x, others_flag) {
  // 50文字程度にCutしてTweet
  var sentence = "instagram更新 (笠原桃奈ちゃん関連) \n\n"
    + x.sentence.substring(0, 50)
    + '...\n#angerme #アンジュルム\n'
    + x.url;
  if(others_flag) {
    sentence = "他メンバー" + sentence;
  }
  return sentence;
}

function imageSave(x, others_flag) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: x.image_url, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(x.image_name, body, 'binary');
        }
        resolve(x);
      });
  });
}

function tweet(x, others_flag) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findInstagramResult(x.url);
    if(result == null) {
      var error = await TWEET.post(getTweetText(x, others_flag), [ x.image_name ]);
      if(!error) {
        await FIRESTORE.addInstagramResult(x);
      }
    } else {
      console.log(new Date() + ' ' + result.url + ' was already tweeted');
    }
    resolve();
  });
}

exports.run = async function(url = URL, number_of_article = 5, others_flag) {
  var instagrams = await INSTAGRAM.fetch(url, number_of_article);
  var myPromise = Promise.resolve();
  for(var x of instagrams) {
    // There are no momona words, skip
    if(confirm_include_momona_name(x.sentence)){
      myPromise = myPromise.then(imageSave.bind(this, x, others_flag)).then(tweet);
    }
  }
}