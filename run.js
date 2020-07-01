const TWEET = require('./tweet.js');
const AMEBA = require('./fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const MONGO = require('./mongo.js');

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var result = await MONGO.findAmebaResult(blog);
    if(result == null) {
      await MONGO.addAmebaResult(blog);
      TWEET.post(AMEBA.getTweetText(blog.url, blog.title));
    } else {
      console.log(result);
    }
})();
