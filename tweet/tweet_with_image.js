var Twitter = require('twitter');
const credential = require('../credential.js');

var client = new Twitter({
    consumer_key: credential.keys.consumer_key,
    consumer_secret: credential.keys.consumer_secret,
    access_token_key: credential.keys.access_token_key,
    access_token_secret: credential.keys.access_token_secret
});

exports.post = async function(tweet, image_names) {
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
    console.log(new Date()+ " tweet success: " + status.status);
  } catch(e) {
    console.log(e);
  }
}

