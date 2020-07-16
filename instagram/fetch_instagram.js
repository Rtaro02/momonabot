const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
// 繰り返しの時間。Cronの時刻と合わせること

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

exports.fetch = async function(url, number_of_article) {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--incognito'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.waitFor(1500);

    // 一番上の行を取得する
    var items = await page.$$('article > div > div > div > div');
    var list = [];
    for(var item of items) {
      var urlItem = await item.$('a');
      url = await (await urlItem.getProperty('href')).jsonValue();
      list.push(url);
    }

    var n = 0;
    var result = [];
    if(!number_of_article) {
      number_of_article = 3;
    }
    var myPromise = Promise.resolve();
    while(n < number_of_article) {
      var insta_post = {};
      insta_post.url = list[n];
      await page.goto(list[n], {waitUntil: 'domcontentloaded'});
      await page.waitFor(1500);
      var whole = await page.$$('article > div');
      sentences = await whole[2].$$('div > ul > div > li > div > div > div');
      insta_post.sentence = (await (await sentences[1].getProperty('textContent')).jsonValue()).replace(/^angerme_officialVerified/, '');
      images = await (await whole[1].$('div > div > div')).$$('img');
      var l = [];
      for(var image of images) {
        var image_url = await (await image.getProperty('src')).jsonValue();
        var image_name = image_url.replace(/^https.*\/([^\/]+\.jpg).*$/, '$1');
        l.push(image_name);
        myPromise = myPromise.then(imageSave.bind(this, image_url, image_name));
      }
      insta_post.images = l;
      result.push(insta_post);
      n++;
    }

    browser.close();
    return result;
};