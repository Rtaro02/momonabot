const TWEET = require('../tweet/tweet_with_image.js');
const IMAGE = require('../ameba/save_ameba_images.js');
const AMEBA = require('../ameba/fetch_ameba.js');
const MOMONA_URL = 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html';
const FIRESTORE = require('../firestore/firestore.js');
const process = require('process');

function getTweetText(url, title) {
  return 'アンジュルム メンバー『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var image_names = await IMAGE.save(blog.url);
    var result = await FIRESTORE.findAmebaResult(blog.url);
    var willTweet = process.argv[2];
    if(result == null) {
      await FIRESTORE.addAmebaResult(blog);
      if(willTweet) {
        await TWEET.post(getTweetText(blog.url, blog.title), image_names);
      } else {
        console.log(new Date() + ' tweet was skipped by user.');
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already posted. ');
    }
})();
