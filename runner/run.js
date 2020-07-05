const TWEET = require('../tweet/tweet.js');
const AMEBA = require('../ameba/fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const MONGO = require('../mongo/mongo.js');

function getTweetText(url, title) {
  return "アンジュルム メンバー『" + title + "』\n" + url;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var result = await MONGO.findAmebaResult(blog);
    if(result == null) {
      await MONGO.addAmebaResult(blog);
      TWEET.post(getTweetText(blog.url, blog.title));
    } else {
      console.log(result);
    }
})();
