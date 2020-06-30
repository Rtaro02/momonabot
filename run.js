const TWEET = require('./tweet.js');
const AMEBA = require('./fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const MONGO = require('./mongo.js');

function milli2Min(diff) {
    var milli = 1000;
    var min = 60;
    return diff / milli / min;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var result = await MONGO.findAmebaResult(blog);
    if(result == null) {
      await MONGO.addAmebaResult(blog);
      console.log("tweeT!!!");
      //TWEET.post(AMEBA.getTweetText(blog.url, blog.title));
    } else {
      console.log(result);
    }
})();
