const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
const { confirm_include_momona_name } = require('../util/util');
const { post_with_images } = require('../tweet/tweet');
const credential = require('../secret/credential.js').instagram;

exports.fetch = async function(instagram_url, number_of_article) {
    const browser = await puppeteer.launch({ 
        // headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--incognito'
        ]
    });

    const page = await browser.newPage();
    await page.setUserAgent("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");

    // Login Page
    await page.goto("https://www.instagram.com/accounts/login/?next=/angerme_official/", {waitUntil: 'domcontentloaded'});

    await page.waitFor('input[name="username"]', { visible: true });

    await page.type('input[name="username"]', credential.username);
    await page.type('input[name="password"]', credential.password);
    const button = await page.$('button[type="submit"]');
    await button.click();

    await page.waitFor(3000);

    await page.goto(instagram_url);
    var article = await page.$('article');
    var a_tags = await article.$$('a');
    var urls = [];
    for(var a_tag of a_tags) {
      var url = await (await a_tag.getProperty('href')).jsonValue();
      urls.push(url);
    }
    var results = []
    var i = 0;
    for(var url of urls) {
      if(number_of_article < ++i) {
        break;
      }
      var result = {}
      console.log(`Checking ${url}`);
      await page.goto(url);
      var right_allow = await page.$('div.coreSpriteRightChevron');
      if(right_allow != null || right_allow != undefined) {
        await right_allow.click();
      }
      // var article = await page.$('article');
      // var main_area = await article.$$('div');
      var main_area = await page.$$('article > div');
      var imgs = await main_area[1].$$('img');
      var spans = await main_area[2].$$('span');
      var post_flag = false;
      var main_sentence;
      for(var span of spans) {
        var text = await (await span.getProperty('textContent')).jsonValue();
        // Check previous text status. 
        // After "Verified" sentence, main sentence posted by members come.
        if(post_flag) {
          main_sentence = text.replace(/^[ \.・\n]*/, '');
        }
        // Check "Verified" stirng. this value will be used at next term.
        post_flag = /Verified/.test(text);
      }
      image_urls = [];
      image_names = [];
      for(var img of imgs) {
        var image_url = await (await img.getProperty('src')).jsonValue();
        var image_name = image_url.replace(/^https.*\/([^\/]+\.jpg).*$/, '$1');
        console.log(`Instagram image is ${image_url}`);
        image_urls.push(image_url);
        image_names.push(image_name);
      }
      result.url = url;
      result.sentence = main_sentence;
      result.image_urls = image_urls;
      result.image_names = image_names;
      results.push(result);
      console.log(main_sentence);
    }
    browser.close();
    return results;
};