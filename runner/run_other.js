const TWEET = require('../tweet/tweet.js');
const OTHER = require('../ameba/fetch_other_members.js');
const MONGO = require('../mongo/mongo.js');
const process = require('process');

const URLS = [
  'https://ameblo.jp/angerme-amerika/theme-10087142424.html', // Akari
  'https://ameblo.jp/angerme-ss-shin/theme-10103225477.html', // Ayano
  'https://ameblo.jp/angerme-ss-shin/theme-10087285029.html', // Rikaco
  'https://ameblo.jp/angerme-ss-shin/theme-10094584095.html', // Moe
  // 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html', // Momona
  'https://ameblo.jp/angerme-ss-shin/theme-10103225326.html', // Musubu
  'https://ameblo.jp/angerme-new/theme-10108008043.html', // Layla
  'https://ameblo.jp/angerme-new/theme-10109826701.html', // Rin
];

function getTweetText(url, title) {
  return "他のメンバーがブログで笠原桃奈ちゃんに触れています『" + title + "』" + url;
}

(async() => {
  var blog = await OTHER.fetch_other_members(URLS[process.argv[2]]);
  if (blog != null) {
    // This blog include momona episode.
    var result = await MONGO.findAmebaResult(blog);
    var willTweet = process.argv[3];
    if(result == null) {
      // Have not posted yet.
      await MONGO.addAmebaResult(blog);
      if(willTweet) {
        TWEET.post(getTweetText(blog.url, blog.title));
      } else {
        console.log(new Date() + " tweet was skipped by user.");
      }
    } else {
      console.log(new Date() + " " + result.title + " was already posted. ");
    }
  }
})();
