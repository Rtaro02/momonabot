const puppeteer = require('puppeteer');
const request = require('request');
const dom_structure = 'li.skin-borderQuiet > div > div';

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
    // await page.waitFor(1500);

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

function getPadding(x) {
  var time;
  if(/^\d$/.test(x)) {
    time = "0" + x;
  } else {
    time = x;
  }
  return time;
}

exports.fetch_old_momona_post = async function(date, target_year) {
  var base_year = date.getFullYear();
  var month = getPadding(date.getMonth() + 1);
  var day = getPadding(date.getDate());

  var baseurl = "https://ameblo.jp/angerme-ss-shin/archive";
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--incognito'
    ]
  });
  const page = await browser.newPage();
  var time_delta = base_year - target_year;
  var blogs = [];
  var year = target_year;
  console.log(`${year}/${month}/${day} のブログを探索中...`);
  var previousUrl = "";
  var end_flag = false;
  var pageNo = 1;
  while(true) {
    var url = baseurl + pageNo + "-" + year + month + ".html"
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    // await page.waitForTimeout(1500);

    var items = await page.$$('li.skin-borderQuiet');

    var flag = true;
    for(var i = 0; i < items.length; i++) {
      var blog = {};
      var item = items[i];
      var urlItem = await item.$('h2 > a');
      var timeItem = await item.$('p.skin-textQuiet');
      var authorItem = await item.$('dd.skin-textQuiet > a');
      if(!!urlItem && !!timeItem) {
        blog.url = await (await urlItem.getProperty('href')).jsonValue();
        blog.title = await (await urlItem.getProperty('textContent')).jsonValue();
        blog.time = (await (await timeItem.getProperty('textContent')).jsonValue()).replace('NEW!', '');
        blog.author =  await (await authorItem.getProperty('textContent')).jsonValue();
        blog.time_delta = time_delta;
        var blog_date = blog.time.replace(/^\d+-\d+-(\d+) [\d:]+$/, '$1');
        if(previousUrl == blog.url) {
          end_flag = true;
          break;
        }
        // 初回のみ書き込む
        if(flag) {
          previousUrl = blog.url;
          flag = false;
        }
        regex = /笠原桃奈/;
        if(regex.test(blog.author) || regex.test(blog.title)) {
          if(day == blog_date) {
            blogs.push(blog);
          }
        }
      }
    }
    if(end_flag) {
      break;
    }
    pageNo++;
  }
  browser.close();
  return blogs;
};