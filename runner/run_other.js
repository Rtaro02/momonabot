const TWEET = require('../tweet/tweet.js');
const OTHER = require('../ameba/fetch_other_members.js');
const MONGO = require('../mongo/mongo.js');
const process = require('process');

const URLS = [
  'https://ameblo.jp/angerme-amerika/theme-10087142424.html', // Akari Takeuchi
  'https://ameblo.jp/angerme-ss-shin/theme-10103225477.html', // Ayano Kawamura
  'https://ameblo.jp/angerme-ss-shin/theme-10087285029.html', // Rikaco Sasaki
  'https://ameblo.jp/angerme-ss-shin/theme-10094584095.html', // Moe Kamikokuryo
  // 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html', // Momona Kasahara
  'https://ameblo.jp/angerme-ss-shin/theme-10103225326.html', // Musubu Funaki
  'https://ameblo.jp/angerme-new/theme-10108008037.html', // Haruka Ota
  'https://ameblo.jp/angerme-new/theme-10108008043.html', // Layla Ise
  'https://ameblo.jp/angerme-new/theme-10109826701.html', // Rin Hashisako
  'https://ameblo.jp/morningmusume-9ki/theme-10059757620.html', // Mizuki Fukumura
  'https://ameblo.jp/morningmusume-9ki/theme-10059751724.html', // Erina Ikuta
  'https://ameblo.jp/morningmusume-10ki/theme-10059753284.html', // Ayumi Ishida
  'https://ameblo.jp/morningmusume-10ki/theme-10059753314.html', // Masaki Sato
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
  'https://ameblo.jp/juicejuice-official/theme-10073622432.html', // Tomoko Kanazawa
  'https://ameblo.jp/juicejuice-official/theme-10073622464.html', // Sayuki Takagi
  'https://ameblo.jp/juicejuice-official/theme-10073622495.html', // Karin Miyamoto
  'https://ameblo.jp/juicejuice-official/theme-10073622506.html', // Akari Uemura
  'https://ameblo.jp/juicejuice-official/theme-10106520232.html', // Manaka Inaba
  'https://ameblo.jp/juicejuice-official/theme-10112191749.html', // Rei Inoue
  'https://ameblo.jp/juicejuice-official/theme-10103223818.html', // Ruru Danbara
  'https://ameblo.jp/juicejuice-official/theme-10109826771.html', // Yume Kudo
  'https://ameblo.jp/juicejuice-official/theme-10109826774.html', // Riai Matsunaga
  'https://ameblo.jp/tsubaki-factory/theme-10090188545.html', // Riko Yamagishi
  'https://ameblo.jp/tsubaki-factory/theme-10090188547.html', // Risa Ogata
  'https://ameblo.jp/tsubaki-factory/theme-10090188548.html', // Kisora Niinuma
  'https://ameblo.jp/tsubaki-factory/theme-10090188551.html', // Ami Tanimoto
  'https://ameblo.jp/tsubaki-factory/theme-10090188555.html', // Yumeno Kishimoto
  'https://ameblo.jp/tsubaki-factory/theme-10090188560.html', // Kiki Asakura
  'https://ameblo.jp/tsubaki-factory/theme-10098778223.html', // Mizuho Ono
  'https://ameblo.jp/tsubaki-factory/theme-10098778228.html', // Saori Onoda
  'https://ameblo.jp/tsubaki-factory/theme-10098778236.html', // Mao Akiyama
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
];

function getTweetText(url, title) {
  return '他のメンバーがブログで笠原桃奈ちゃんに触れています\n\n『' + title + '』 #ANGERME #アンジュルム \n' + url;
}

(async() => {
  var blog = await OTHER.fetch_other_members(URLS[process.argv[2]]);
  if (blog != null) {
    // This blog include momona episode.
    var result = await MONGO.findAmebaResult(blog);
    var willTweet = process.argv[3];
    if(result == null) {
      // Have not posted yet.
      await MONGO.addAmebaResult(blog);
      if(willTweet) {
        TWEET.post(getTweetText(blog.url, blog.title));
      } else {
        console.log(new Date() + ' tweet was skipped by user.');
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already posted. ');
    }
  }
})();
