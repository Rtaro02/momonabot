const TWEET = require('./tweet.js');
const OTHER = require('./fetch_other_members.js');
const MONGO = require('./mongo.js');
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

(async() => {
  var blog = await OTHER.fetch_other_members(URLS[process.argv[2]]);
  if (blog != null) {
    // This blog include momona episode.
    var result = await MONGO.findAmebaResult(blog);
    if(result == null) {
      // Have not posted yet.
      await MONGO.addAmebaResult(blog);
      TWEET.post(OTHER.getTweetText(blog.url, blog.title));
    } else {
      console.log("Already posted.");
    }
  }
})();
