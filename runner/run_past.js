const TWEET = require('../tweet/tweet.js');
const AMEBA = require('../ameba/fetch_ameba.js');

function getTweetText(url, title, delta) {
  return delta + '年前の笠原桃奈ちゃんのブログです\n\n『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

exports.run = async function(year) {
  var date = new Date();
  var blogs = await AMEBA.fetch_old_momona_post(date, year);
  if (blogs.length != 0) {
    for(var blog of blogs) {
      TWEET.post(getTweetText(blog.url, blog.title, blog.time_delta));
    }
  }
}
