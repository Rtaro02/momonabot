const puppeteer = require('puppeteer');
const dom_structure = "div.grid-list > div";
const eline_angerme_url = 'https://www.elineupmall.com/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=%E3%82%A2%E3%83%B3%E3%82%B8%E3%83%A5%E3%83%AB%E3%83%A0&dispatch=products.search&page=';
function isMomona(x) {
  if(/竹内/.test(x)) {
    return false;
  }
  if(/朱莉/.test(x)) {
    return false;
  }
  if(/佐々木/.test(x)) {
    return false;
  }
  if(/莉佳子/.test(x)) {
    return false;
  }
  if(/上國料/.test(x)) {
    return false;
  }
  if(/萌衣/.test(x)) {
    return false;
  }
  if(/川村/.test(x)) {
    return false;
  }
  if(/文乃/.test(x)) {
    return false;
  }
  if(/船木/.test(x)) {
    return false;
  }
  if(/結/.test(x)) {
    return false;
  }
  if(/太田/.test(x)) {
    return false;
  }
  if(/遥香/.test(x)) {
    return false;
  }
  if(/伊勢/.test(x)) {
    return false;
  }
  if(/鈴蘭/.test(x)) {
    return false;
  }
  if(/橋迫/.test(x)) {
    return false;
  }
  if(/鈴/.test(x)) {
    return false;
  }
  return true;
}

function screening(list) {
  var l = [];
  for(var i of list) {
    if(isMomona(i.title)) {
      l.push(i)
    }
  }
  return l;
}

async function load(url) {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuidjj-sandbox',
          '--incognito'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "domcontentloaded"});
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
      list.push(map);
    }
    browser.close();
    return list;
};

function getPageUrl(pageNumber) {
  return eline_angerme_url + pageNumber;
};

exports.fetch = async function() {
    var list = [];
    var n = 1;
    var final_page = 5;
    while(n <= final_page) {
      var a = await load(getPageUrl(n));
      list = list.concat(screening(a));
      n++;
    }
    return list;
}

// module.exports.fetch();