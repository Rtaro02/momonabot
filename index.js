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
const URLS = [
  // Angerme
  'https://ameblo.jp/angerme-amerika/theme-10087142424.html', // Akari Takeuchi
  'https://ameblo.jp/angerme-ss-shin/theme-10103225477.html', // Ayano Kawamura
  'https://ameblo.jp/angerme-ss-shin/theme-10087285029.html', // Rikaco Sasaki
  'https://ameblo.jp/angerme-ss-shin/theme-10094584095.html', // Moe Kamikokuryo
  // 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html', // Momona Kasahara
  'https://ameblo.jp/angerme-ss-shin/theme-10103225326.html', // Musubu Funaki
  'https://ameblo.jp/angerme-new/theme-10108008037.html', // Haruka Ota
  'https://ameblo.jp/angerme-new/theme-10108008043.html', // Layla Ise
  'https://ameblo.jp/angerme-new/theme-10109826701.html', // Rin Hashisako
  'https://ameblo.jp/angerme-new/theme-10113863093.html', // Rin Kawana
  'https://ameblo.jp/angerme-new/theme-10113863094.html', // Shion Tamenaga
  'https://ameblo.jp/angerme-new/theme-10113863095.html', // Wakana Matsumoto
  'https://ameblo.jp/angerme-new/theme-10116089558.html', // Yuki Hirayama
  // Morning
  'https://ameblo.jp/morningmusume-9ki/theme-10059757620.html', // Mizuki Fukumura
  'https://ameblo.jp/morningmusume-9ki/theme-10059751724.html', // Erina Ikuta
  'https://ameblo.jp/morningmusume-10ki/theme-10059753284.html', // Ayumi Ishida
  // 'https://ameblo.jp/morningmusume-10ki/theme-10059753314.html', // Masaki Sat
  'https://ameblo.jp/morningmusume-10ki/theme-10068520081.html', // Sakura Oda
  'https://ameblo.jp/mm-12ki/theme-10086725506.html', // Miki Nonaka
  'https://ameblo.jp/mm-12ki/theme-10086725508.html', // Maria Makino
  'https://ameblo.jp/mm-12ki/theme-10086725549.html', // Akane Haga
  'https://ameblo.jp/morningm-13ki/theme-10101009109.html', // Reina Yokoyama
  'https://ameblo.jp/morningm-13ki/theme-10101156746.html', // Kaede Kaga
  'https://ameblo.jp/morningm-13ki/theme-10103247869.html', // Chisaki Morito
  'https://ameblo.jp/morningmusume15ki/theme-10109826702.html', // Rio Kitagawa
  'https://ameblo.jp/morningmusume15ki/theme-10109826703.html', // Homare Okamura
  'https://ameblo.jp/morningmusume15ki/theme-10109826705.html', // Mei Yamazaki
  // Juice
  // 'https://ameblo.jp/juicejuice-official/theme-10073622432.html', // Tomoko Kanazawa
  // 'https://ameblo.jp/juicejuice-official/theme-10073622464.html', // Sayuki Takagi
  // 'https://ameblo.jp/juicejuice-official/theme-10073622495.html', // Karin Miyamoto
  'https://ameblo.jp/juicejuice-official/theme-10073622506.html', // Akari Uemura
  'https://ameblo.jp/juicejuice-official/theme-10106520232.html', // Manaka Inaba
  'https://ameblo.jp/juicejuice-official/theme-10112191749.html', // Rei Inoue
  'https://ameblo.jp/juicejuice-official/theme-10103223818.html', // Ruru Danbara
  'https://ameblo.jp/juicejuice-official/theme-10109826771.html', // Yume Kudo
  'https://ameblo.jp/juicejuice-official/theme-10109826774.html', // Riai Matsunaga
  'https://ameblo.jp/juicejuice-official/theme-10115236098.html', // Ichika Arisawa
  'https://ameblo.jp/juicejuice-official/theme-10115236105.html', // Risa Irie
  'https://ameblo.jp/juicejuice-official/theme-10115236106.html',  // Kisaki Ebata
  // Camellia
  'https://ameblo.jp/tsubaki-factory/theme-10090188545.html', // Riko Yamagishi
  'https://ameblo.jp/tsubaki-factory/theme-10090188547.html', // Risa Ogata
  'https://ameblo.jp/tsubaki-factory/theme-10090188548.html', // Kisora Niinuma
  'https://ameblo.jp/tsubaki-factory/theme-10090188551.html', // Ami Tanimoto
  'https://ameblo.jp/tsubaki-factory/theme-10090188555.html', // Yumeno Kishimoto
  'https://ameblo.jp/tsubaki-factory/theme-10090188560.html', // Kiki Asakura
  'https://ameblo.jp/tsubaki-factory/theme-10098778223.html', // Mizuho Ono
  'https://ameblo.jp/tsubaki-factory/theme-10098778228.html', // Saori Onoda
  'https://ameblo.jp/tsubaki-factory/theme-10098778236.html', // Mao Akiyama
  'https://ameblo.jp/tsubaki-factory/theme-10115236271.html', // Yumi Kasai
  'https://ameblo.jp/tsubaki-factory/theme-10115236273.html', // Shiori Yagi
  'https://ameblo.jp/tsubaki-factory/theme-10115236275.html', // Marine Fukuda
  'https://ameblo.jp/tsubaki-factory/theme-10115236298.html', // Runo Yofu
  // Beyond
  'https://ameblo.jp/beyooooonds-chicatetsu/theme-10107497239.html', // Reina Ichioka
  'https://ameblo.jp/beyooooonds-chicatetsu/theme-10107497241.html', // Rika Shimakura
  'https://ameblo.jp/beyooooonds-chicatetsu/theme-10107497243.html', // Shiori Nishida
  'https://ameblo.jp/beyooooonds-chicatetsu/theme-10107497245.html', // Saya Eguchi
  'https://ameblo.jp/beyooooonds-rfro/theme-10107497232.html', // Kurumi Takase
  'https://ameblo.jp/beyooooonds-rfro/theme-10107497233.html', // Kokoro Maeda
  'https://ameblo.jp/beyooooonds-rfro/theme-10107497235.html', // Yuhane Yamazaki
  'https://ameblo.jp/beyooooonds-rfro/theme-10107497237.html', // Minami Okamura
  'https://ameblo.jp/beyooooonds-rfro/theme-10107497238.html', // Momohime Kiyono
  'https://ameblo.jp/beyooooonds/theme-10108019356.html', // Miyo Hirai
  'https://ameblo.jp/beyooooonds/theme-10108019358.html', // Honoka Kobayashi
  'https://ameblo.jp/beyooooonds/theme-10108019359.html', // Utano Satoyoshi
  // Ocha
  'https://ameblo.jp/ocha-norma/theme-10116081451.html', // Ruri Hiromoto
  'https://ameblo.jp/ocha-norma/theme-10116081458.html', // Kirara Yonemura
  'https://ameblo.jp/ocha-norma/theme-10116081595.html', // Miku Nishizaki
  'https://ameblo.jp/ocha-norma/theme-10116081607.html', // Natsume Nakayama
  'https://ameblo.jp/ocha-norma/theme-10116081828.html', // Roko Tsutsui
  'https://ameblo.jp/ocha-norma/theme-10116082093.html', // Momo Kitahara
  'https://ameblo.jp/ocha-norma/theme-10116082099.html', // Sumire Tashiro
  'https://ameblo.jp/ocha-norma/theme-10116082511.html', // Nanami Kubota
  'https://ameblo.jp/ocha-norma/theme-10116082345.html', // Kanami Ishiguri
  'https://ameblo.jp/ocha-norma/theme-10116082736.html' // Madoka Saitou
];

app.get('/ameba/momona', async (req, res) => {
    await ameba_momona.run();
    res.send("accepted");
});

app.get('/ameba/others', async (req, res) => {
    for(var i = 0; i < URLS.length; i++) {
        await ameba_others.run(URLS[i]);
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
// Timeout 10min.
app.timeout = 1000 * 60 * 10;