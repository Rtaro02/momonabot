const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');

exports.getTweetText = function(url, title) {
  return 'アンジュルム メンバー『' + title + '』' + url;
}

function imageSave(url, name) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: url, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(name, body, 'binary');
          console.log("Image Saved: " + name);
        }
        resolve();
      });
  });
}

exports.save = async function(url) {
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
    var item = await page.$('div.skin-entryBody');
    var myPromise = Promise.resolve();
    var names = [];
    var images = await item.$$('img.PhotoSwipeImage');
    if(images != null) {
      for(image of images) {
        var url = (await(await image.getProperty('src')).jsonValue()).replace(/\?caw=\d+/, '');
        var name = url.replace(/^https.*\/([^\/]+\.jpg)$/, '$1');
        names.push(name);
        myPromise = myPromise.then(imageSave.bind(this, url, name));
      } 
    }
    browser.close();
    return {
      names: names,
      myPromise: myPromise
    }
};
