const { jar } = require('request');
var Twitter = require('twitter');
const credential = require('../secret/credential.js');
const ANGERME_TWITTER_ID = "111066986"

var client = new Twitter({
    consumer_key: credential.keys.consumer_key,
    consumer_secret: credential.keys.consumer_secret,
    access_token_key: credential.keys.access_token_key,
    access_token_secret: credential.keys.access_token_secret
});

exports.post = async function(content) {
  try {
    await client.post('statuses/update', {status: content});
    console.log(new Date()+ ' tweet success: ' + content);
  } catch(e) {
    console.log(e)
    if(Array.isArray(e) && e.length > 0 && e[0].code) {
      return null;
    } else {
      return e;
    }
  }
}

exports.post_with_images = async function(tweet, image_names) {
  var array = [];
  for(var image_name of image_names) {
    var data = require('fs').readFileSync(image_name);
    var x = await client.post('media/upload', {media: data});
    if(array.length <= 4) {
      // We can tweet up to 4 images.
      array.push(x.media_id_string);
    }
  }
  var media_ids = array.join(',');

  var status = {
    status: tweet,
    media_ids: media_ids
  }
  try {
    await client.post('statuses/update', status);
    console.log(new Date()+ ' tweet success: ' + status.status);
  } catch(e) {
    console.log(e);
    if(Array.isArray(e) && e.length > 0 && e[0].code) {
      return null;
    } else {
      return e;
    }
  }
}

exports.search = async function(query) {
  var query_parameter = {
    q: query,
    locale: 'ja',
    lang: 'ja',
    result_type: 'mixed',
    count: 100
  }
  var search_result = await client.get('search/tweets', query_parameter);
  var retweet_candidates = []
  for(var tweet of search_result.statuses) {
    if(tweet.user.id == ANGERME_TWITTER_ID) {
      // Skip Angerme official tweet because almost same tweets are posted by momonabot.
      continue;
    }
    retweet_candidates.push(tweet.id_str);
  }
  return retweet_candidates;
}

exports.retweet = async function(retweet_candidate) {
  try {
    await client.post('statuses/retweet/' +  retweet_candidate, {});
    console.log('Retweet success id: ' + retweet_candidate);
  } catch(e) {
    console.log(e);
  }
}
