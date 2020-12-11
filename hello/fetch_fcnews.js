const puppeteer = require('puppeteer');
const dom_structure = 'ul.fanclubnews > li';
const util = require('../util/util.js');

function isMomonaOrAngerme(x) {
  if(/アンジュルム/.test(x)) {
    return util.isMomonaOrAngermeTopic(x);
  }
  return false;
}
function isHelloProject(x) {
  if(/Hello! Project \d\d\d\d/.test(x) && /FC/.test(x)) {
    return true;
  }
  return false;
}
async function load(url, searchWord) {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--incognito'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    // await page.waitFor(1500);
    if(searchWord) {
      await page.type('input[name="HP_NEWS_SearchWord"]', searchWord);
      const button = await page.$('p.f-R > button');
      await button.click();
      // await page.waitFor(1500);
    }

    var items = await page.$$(dom_structure);
    var list = [];
    for(var item of items) {
      map = {};
      var x = await item.$('a');
      map.title = await (await x.getProperty('textContent')).jsonValue();
      map.url = await (await x.getProperty('href')).jsonValue();
      // リファクタしたい
      if(searchWord) {
        // 笠原で検索した場合はHello系、アンジュルム系は重複するので排する
        if(!isMomonaOrAngerme(map.title) && !isHelloProject(map.title)) list.push(map);
      } else {
        if(isMomonaOrAngerme(map.title) || isHelloProject(map.title)) list.push(map);
      }
      // list.push(map)
    }
    browser.close();
    return list;
};

exports.fetch = async function(fc_news_url) {
    var list = [];
    list = list.concat(await load(fc_news_url));
    list = list.concat(await load(fc_news_url, '笠原'));
    return list;
}
