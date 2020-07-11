const puppeteer = require('puppeteer');
const util = require('../util/util.js');
const dom_structure = 'div.grid-list > div';

async function load(url) {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuidjj-sandbox',
          '--incognito'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.waitFor(1500);

    var items = await page.$$(dom_structure);
    var list = [];
    for(var item of items) {
      map = {};
      var x = await item.$('a.product-title');
      map.title = await (await x.getProperty('title')).jsonValue();
      map.url = await (await x.getProperty('href')).jsonValue();
      var y = await item.$('img.ty-pict');
      // Fetch image url and remove sentences for thumbnails.
      map.image = (await (await y.getProperty('src')).jsonValue()).replace(/thumbnails\/\d+\/\d+\//, '').replace(/\?t=\d+/, '');
      map.name = map.image.replace(/^https.*\/([^\/]+\.jpg)$/, '$1');
      if(util.isMomonaOrAngermeTopic(map.title)) {
        list.push(map);
      }
    }
    browser.close();
    return list;
};

function getPageUrl(url, pageNumber) {
  return url + pageNumber;
};

exports.fetch = async function(url, final_page) {
    var list = [];
    var n = 1;
    while(n <= final_page) {
      list = list.concat(await load(getPageUrl(url, n)));
      n++;
    }
    return list;
}