const puppeteer = require('puppeteer');
const dom_structure = 'div.mbox > ul > li';
const util = require('../util/util.js');

async function load(url) {
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

    var items = await page.$$(dom_structure);
    var list = [];
    for(var item of items) {
      // The number of icons of group name.
      var angerme_num = (await item.$$('div.icon-name.angerme')).length;
      var hp_num = (await item.$$('div.icon-name.helloproject')).length;

      // Only angerme or h!p articles will be pushed
      if(angerme_num > 0 || hp_num > 0) {
        var map = {};
        var x = await item.$('p > a');
        map.title = await (await x.getProperty('textContent')).jsonValue();
        map.url = await (await x.getProperty('href')).jsonValue();
        if(util.isMomonaOrAngermeTopic(map.title)) {
          list.push(map);
        }
      }
    }
    browser.close();
    return list;
};

exports.fetch = async function(hpnews_url) {
    list = await load(hpnews_url);
    return list;
}