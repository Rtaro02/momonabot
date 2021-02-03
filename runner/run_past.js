const TWEET = require('../tweet/tweet_with_image.js');
const IMAGE = require('../ameba/save_ameba_images.js');
const AMEBA = require('../ameba/fetch_ameba.js');

function getTweetText(url, title, delta) {
  return delta + '年前の笠原桃奈ちゃんのブログです\n\n『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

exports.run = async function(year) {
  var date = new Date();
  var blogs = await AMEBA.fetch_old_momona_post(date, year);
  if (blogs.length != 0) {
    for(var blog of blogs) {
      var image_names = await IMAGE.save(blog.url);
      var error = true;
      while(!!error) {
        error = await TWEET.post(getTweetText(blog.url, blog.title, blog.time_delta), image_names);
      }
    }
  }
}
