const puppeteer = require('puppeteer');
const request = require('request');
const dom_structure = 'li.skin-borderQuiet > div > div';
// 繰り返しの時間。Cronの時刻と合わせること

exports.fetch = async function(url) {
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

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

exports.fast_fetch = async function(url) {
  var result = (await doRequest(url)).replace(/\n/g, '').replace(/^.*(<ul class="skin-archiveList".*<\/ul>).*$/, '$1');
  var list = result.split('<li');
  var x = list[1].replace(/^.*(<h2 data-uranus-component.*<\/h2>).*/, '$1');
  var blog = {};
  blog.url = 'https://ameblo.jp' + x.replace(/^.*href="([^"]+)".*$/, '$1');
  blog.title = x.replace(/^.*>([^>]+)<\/a>.*$/, '$1').replace(/&quot;/g, '');;
  return blog;
};