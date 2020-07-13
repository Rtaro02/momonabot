const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');

const dom_structure = 'div.skin-entryBody > div';
// 繰り返しの時間。Cronの時刻と合わせること

exports.getTweetText = function(url, title) {
  return 'アンジュルム メンバー『' + title + '』' + url;
}

function imageSave(url, name) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: url, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(name, body, 'binary');
        }
        resolve();
      });
  });
}

exports.save = async function(url) {
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
    var names = [];
    var myPromise = Promise.resolve();
    for(var item of items) {
      var i = await item.$('img'); 
      if(i != null) {
        var url = (await(await i.getProperty('src')).jsonValue()).replace(/\?caw=\d+/, '');
        var name = url.replace(/^https.*\/([^\/]+\.jpg)$/, '$1');
        names.push(name);
        myPromise = myPromise.then(imageSave.bind(this, url, name));
      }
    }
    browser.close();
    return names;
};
