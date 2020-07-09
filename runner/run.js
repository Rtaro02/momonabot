const TWEET = require('../tweet/tweet.js');
const AMEBA = require('../ameba/fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const MONGO = require('../mongo/mongo.js');
const process = require('process');

function getTweetText(url, title) {
  return "アンジュルム メンバー『" + title + "』 #ANGERME #アンジュルム \n" + url;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var result = await MONGO.findAmebaResult(blog);
    var willTweet = process.argv[2];
    if(result == null) {
      await MONGO.addAmebaResult(blog);
      if(willTweet) {
        TWEET.post(getTweetText(blog.url, blog.title));
      } else {
        console.log(new Date() + " tweet was skiped by user.");
      }
    } else {
      console.log(new Date() + " " + result.title + " was already posted. ");
    }
})();
