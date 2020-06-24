const TWEET = require('./tweet.js');
const AMEBA = require('./fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const TIME_UNIT = 1;

function milli2Min(diff) {
    var milli = 1000;
    var min = 60;
    return diff / milli / min;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var blog_time = new Date(blog.time).getTime(); 
    var current_time = new Date().getTime();
    var diff = current_time - blog_time;
    // Min. -> MilliSec.
    var threshold = TIME_UNIT * 60 * 1000;
    console.log("Diff Time is " + diff + "milli seconds.");
    if (diff < threshold) {
      TWEET.post(AMEBA.getTweetText(blog.url, blog.title));
    } else {
      console.log("No Update, diff is " + milli2Min(diff) + " min.");
    }
})();