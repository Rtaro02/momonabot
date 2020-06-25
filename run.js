const TWEET = require('./tweet.js');
const AMEBA = require('./fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const TIME_UNIT = 1000;

function milli2Min(diff) {
    var milli = 1000;
    var min = 60;
    return diff / milli / min;
}

function get_tweet(url, title) {
  return "アンジュルム メンバー『" + title + "』" + url;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var blog_time = new Date(blog.time).getTime(); 
    var current_time = new Date().getTime();
    var diff = current_time - blog_time;
    // Min. -> MilliSec.
    var threshold = TIME_UNIT * 60 * 1000;
    console.log(new Date + " Diff Time is " + diff + " milli seconds.");
    if (diff < threshold) {
      TWEET.post(get_tweet(blog.url, blog.title));
    } else {
      console.log(new Date + " No Update, diff is " + milli2Min(diff) + " min.");
    }
})();