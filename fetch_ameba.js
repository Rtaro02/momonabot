const puppeteer = require('puppeteer');
const dom_structure = "ul.skin-archiveList > li.skin-borderQuiet > div > div";
// 繰り返しの時間。Cronの時刻と合わせること

exports.getTweetText = function(url, title) {
  return "アンジュルム メンバー『" + title + "』" + url;
}

exports.fetch = async function(url) {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuidjj-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "domcontentloaded"});
    await page.waitFor(1500);

    var items = await page.$$(dom_structure);

    var n = 1;
    var blog = {};
    for(var item of items) {
      if (n==2){
        // 2番目のAタグ
        var urlItem = await item.$('a');
        var timeItem = await item.$('p');
        blog.url = await (await urlItem.getProperty('href')).jsonValue();
        blog.title = await (await urlItem.getProperty('textContent')).jsonValue();
        blog.time = (await (await timeItem.getProperty('textContent')).jsonValue()).replace('NEW!', '');
        break;
      };
      n++;
    }

    browser.close();
    return blog;
};
