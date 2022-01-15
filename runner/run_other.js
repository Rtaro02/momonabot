const TWEET = require('../tweet/tweet.js');
const OTHER = require('../ameba/fetch_other_members.js');
const IMAGE = require('../ameba/save_ameba_images.js');
const FIRESTORE = require('../firestore/firestore.js');

function getTweetText(url, title) {
  return '他のメンバーがブログで笠原桃奈ちゃんに触れています\n\n『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

function tweet(blog, image_names) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findAmebaResult(blog.url);
    if(result == null) {
      var error = await TWEET.post_with_images(getTweetText(blog.url, blog.title), image_names);
      if(!error) {
        await FIRESTORE.addAmebaResult(blog);
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already posted. ');
    }
    resolve();
  });
}

exports.run = async function(url) {
  var blog = await OTHER.fetch_other_members(url);
  if (blog != null) {
    var result = await IMAGE.save(blog.url);
    var myPromise = result.myPromise;
    var image_names = result.names;
    myPromise.then(tweet.bind(this, blog, image_names));
  }
}