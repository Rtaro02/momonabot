const puppeteer = require('puppeteer');
const fetch_ameba = require('./fetch_ameba');
const dom_structure = "div.skin-entryBody";
const KANJI_KASAHARA = /笠原/;
const KANJI_MOMONA = /桃奈/;
const KANA_KASAHARA = /[かカｶ][さサｻ][はハﾊ][らラﾗ]/;
const KANA_MOMONA = /[もモﾓ][もモﾓ][なナﾅ]/;
const MOMOCHAN = /[もモﾓ][もモﾓ][ちチﾁ][ゃャｬ][んンﾝ]/;
const ROMAJI_KASAHARA = /[Kk][Aa][Ss][Aa][Hh][Aa][Rr][Aa]/;
const ROMAJI_MOMONA = /[Mm][Oo][Mm][Oo][Nn][Aa]/;
const KANA_KASSA = /[かカｶ][っッｯ][さサｻ]/;
const KAMIKASA = /[かカｶ][みミﾐ][かカｶ][さサｻ]/;

exports.confirm_include_momona_name = function(honbun) {
  if(KANJI_KASAHARA.test(honbun)) {
    return true;
  }
  if(KANJI_MOMONA.test(honbun)){
    return true;
  }
  if(KANA_KASAHARA.test(honbun)) {
    return true;
  }
  if(KANA_MOMONA.test(honbun)){
    return true;
  }
  if(ROMAJI_KASAHARA.test(honbun)) {
    return true;
  }
  if(ROMAJI_MOMONA.test(honbun)){
    return true;
  }
  if(KANA_KASSA.test(honbun)){
    return true;
  }
  if(MOMOCHAN.test(honbun)){
    return true;
  }
  if(KAMIKASA.test(honbun)){
    return true;
  }
  return false;
}

exports.check_momona_existence = async function(url) {
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

  var data = await page.$eval(dom_structure, item => {
    return item.textContent;
  });

  browser.close();
  return module.exports.confirm_include_momona_name(data);
};

exports.fetch_other_members = async function(url) {
  var blog = fetch_ameba.fetch(url);
  var is_include = check_momona_existence(data.url);
  if(is_include) {
    return blog;
  }
}