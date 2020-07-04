const TWEET = require('./tweet_with_image.js');
const IMAGE = require('./save_ameba_images.js');
const AMEBA = require('./fetch_ameba.js');
const MOMONA_URL = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const MONGO = require('./mongo.js');

function getTweetText(url, title) {
  return "アンジュルム メンバー『" + title + "』\n" + url;
}

(async() => {
    var blog = await AMEBA.fetch(MOMONA_URL);
    var image_names = await IMAGE.save(blog.url);
    var result = await MONGO.findAmebaResult(blog);
    if(result == null) {
      await MONGO.addAmebaResult(blog);
      await TWEET.post(getTweetText(blog.url, blog.title), image_names);
    } else {
      console.log(result);
    }
})();
