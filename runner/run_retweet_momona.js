const TWEET = require('../tweet/tweet.js');

exports.run = async function() {
  var retweet_candidates = await TWEET.search('#笠原桃奈 OR "笠原桃奈" OR "かっさー" min_retweets:10');
  for(var id of retweet_candidates) {
    await TWEET.retweet(id);
  }
}