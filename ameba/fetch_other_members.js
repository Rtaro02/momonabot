const fetch_ameba = require('./fetch_ameba');
const request = require('request');
const KANJI_KASAHARA = /笠原/;
const KANJI_MOMONA = /桃奈/;
const KANA_KASAHARA = /[かカｶ][さサｻ][はハﾊ][らラﾗ]/;
const KANA_MOMONA = /[もモﾓ][もモﾓ][なナﾅ]/;
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
  if(KAMIKASA.test(honbun)){
    return true;
  }
  return false;
}

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

exports.check_momona_existence = async function(url) {
  var result = (await doRequest(url)).replace(/\n/g, '').replace(/^.*(<article.*<\/article>).*$/, '$1');
  return module.exports.confirm_include_momona_name(result);
};

exports.fetch_other_members = async function(url) {
  var blog = await fetch_ameba.fast_fetch(url);
  var is_include = await module.exports.check_momona_existence(blog.url);
  if(is_include) {
    console.log(new Date() + ' There are momona episode! in ' + blog.title);
    return blog;
  } else {
    console.log(new Date() + ' There are no episode in ' + blog.title);
    return null;
  }
}