const TWEET = require('../tweet/tweet_with_image.js');
const IMAGE = require('../ameba/save_ameba_images.js');
const AMEBA = require('../ameba/fetch_ameba.js');

function getTweetText(url, title, delta) {
  return delta + '年前の笠原桃奈ちゃんのブログです\n\n『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

function tweet(blog, image_names) {
  return new Promise(async function(resolve, reject) {
    await TWEET.post(getTweetText(blog.url, blog.title, blog.time_delta), image_names);
    resolve();
  });
}

exports.run = async function(year) {
  var date = new Date();
  var blogs = await AMEBA.fetch_old_momona_post(date, year);
  if (blogs.length != 0) {
    for(var blog of blogs) {
      var result = await IMAGE.save(blog.url);
      var myPromise = result.myPromise;
      var image_names = result.names;
      myPromise.then(tweet.bind(this, blog, image_names));
    }
  } else {
    console.log("There are no momona blog at " + year);
  }
}
