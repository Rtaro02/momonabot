const express = require('express');
const app = express();
const ameba_momona = require('./runner/run_momona.js');
const ameba_others = require('./runner/run_other.js');
const ameba_past = require('./runner/run_past.js');
const eline = require('./runner/run_eline.js');
const hpfc = require('./runner/run_hpfc.js');
const instagram = require('./runner/run_instagram.js');
const instagram_others = require('./runner/run_instagram_others.js');
const retweet = require('./runner/run_retweet_momona.js');
const NUMBER_OF_HPMEMBERS = 54;

app.get('/ameba/momona', async (req, res) => {
    await ameba_momona.run();
    res.send("accepted");
});

app.get('/ameba/others', async (req, res) => {
    for(var i = 0; i < NUMBER_OF_HPMEMBERS; i++) {
        await ameba_others.run(i);
    }
    res.send("accepted");
});

app.get('/ameba/past/:year', async (req, res) => {
    await ameba_past.run(req.params.year);
    res.send("accepted");
});

app.get('/eline', async (req, res) => {
    await eline.run();
    res.send("accepted");
});

app.get('/hpfc', async (req, res) => {
    await hpfc.run();
    res.send("accepted");
});

app.get('/instagram/angerme', async (req, res) => {
    await instagram.run();
    res.send("accepted");
});

app.get('/instagram/others', async (req, res) => {
    await instagram_others.run();
    res.send("accepted");
});

app.get('/retweet', async (req, res) => {
    await retweet.run();
    res.send("accepted");
}); 

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`momonabot: listening on port ${port}`);
});
app.timeout = 1000 * 60 * 10;