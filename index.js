const express = require('express');
const app = express();
const ameba_momona = require('./runner/run_tweet_with_image.js');
const ameba_others = require('./runner/run_other');
const NUMBER_OF_HPMEMBERS = 54;

app.get('/ameba/momona', async (req, res) => {
    await ameba_momona.tweet();
    res.send("accepted");
});

app.get('/ameba/others', async (req, res) => {
    for(var i = 0; i < NUMBER_OF_HPMEMBERS; i++) {
        await ameba_others.tweet(i);
    }
    res.send("accepted");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});