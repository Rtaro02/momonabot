const puppeteer = require('puppeteer');
const tweet = require('./tweet.js');
const momona_url = "https://ameblo.jp/angerme-ss-shin/theme-10097979200.html";
const dom_structure = "ul.skin-archiveList > li.skin-borderQuiet > div > div";
// 繰り返しの時間。Cronの時刻と合わせること
const time_unit = 1;

function getTweetText(url, title) {
  return "アンジュルム メンバー『" + title + "』" + url;
}

(async() => {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuidjj-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto(momona_url, {waitUntil: "domcontentloaded"});

    var items = await page.$$(dom_structure);

    var n = 1;
    var url;
    var title;
    var time;
    for(var item of items) {
      if (n==2){
        // 2番目のAタグ
        // See https://vexus2.hatenablog.jp/entry/puppeteer_selector
        // See https://qiita.com/go_sagawa/items/85f97deab7ccfdce53ea
        var urlItem = await item.$('a');
        url = await (await urlItem.getProperty('href')).jsonValue();
        title = await (await urlItem.getProperty('textContent')).jsonValue();
        var timeItem = await item.$('p');
        time = (await (await timeItem.getProperty('textContent')).jsonValue()).replace('NEW!', '');
        break;
      };
      n++;
    }

    var blog_time = new Date(time).getTime(); 
    var current_time = new Date().getTime();
    var diff = current_time - blog_time;
    // Min. -> MilliSec.
    var threshold = time_unit * 60 * 1000;
    if (diff < threshold) {
      tweet.post(getTweetText(url, title));
    } else {
      console.log("No Update, diff is " + diff/1000/60 + " min.");
    }

    browser.close();

})();

