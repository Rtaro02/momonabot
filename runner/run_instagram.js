const TWEET = require('../tweet/tweet.js');
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

function imageSave(image_url) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: image_url, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(image_url.replace(/^https.*\/([^\/]+\.jpg).*$/, '$1'), body, 'binary');
        }
        resolve();
      });
  });
}

function tweet(args) {
  return new Promise(async function(resolve, reject) {
    var x = args[0];
    var others_flag = args[1]
    var result = await FIRESTORE.findInstagramResult(x.url);
    if(result == null) {
      var error = await TWEET.post_with_images(getTweetText(x, others_flag), x.image_names);
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
  for(var instagram of instagrams) {
    // There are no momona words, skip
    if(confirm_include_momona_name(instagram.sentence)){
      console.log("Momona episode was found in " + instagram.url);
      for(var image_url of instagram.image_urls) {
        myPromise = myPromise.then(imageSave.bind(this, image_url));
      }
      myPromise = myPromise.then(tweet.bind(this, [instagram, others_flag]));
    } else {
      console.log("There are no episode in " + instagram.url);
    }
  }
}