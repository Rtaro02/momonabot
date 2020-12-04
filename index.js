const express = require('express');
const app = express();
const ameba_momona = require('./runner/run_tweet_with_image.js');

app.get('/ameba/momona', (req, res) => {
    ameba_momona.tweet();
    res.send("accepted");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});