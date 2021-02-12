const TWEET = require('../tweet/tweet_with_image.js');
const IMAGE = require('../ameba/save_ameba_images.js');
const AMEBA = require('../ameba/fetch_ameba.js');
const MOMONA_URL = 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html';
const FIRESTORE = require('../firestore/firestore.js');

function getTweetText(url, title) {
  return 'アンジュルム メンバー『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

function tweet(blog, image_names) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findAmebaResult(blog.url);
    if(result == null) {
      var error = await TWEET.post(getTweetText(blog.url, blog.title), image_names);
      if(!error) {
        await FIRESTORE.addAmebaResult(blog);
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already posted. ');
    }
    resolve();
  });
}

exports.run = async function() {
  var blog = await AMEBA.fetch(MOMONA_URL);
  var result = await IMAGE.save(blog.url);
  var myPromise = result.myPromise;
  var image_names = result.names;
  myPromise.then(tweet.bind(this, blog, image_names));
}
