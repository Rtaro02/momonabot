const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');

exports.fetch = async function(instagram_url, number_of_article) {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--incognito'
        ]
    });

    const page = await browser.newPage();

    // Login Page
    await page.goto("https://rss.app/rss-feed/create-instagram-rss-feed");
    await page.waitFor('input[placeholder="Enter Instagram URL"]', { visible: true });
    await page.type('input[placeholder="Enter Instagram URL"]', instagram_url, { delay: 27 });
    const button = await page.$('button[ga="provider-submit"]');
    await button.click();

    await page.waitFor('div[ga=feed-overview-preview]');

    var items = await page.$$('div[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"]');
    var result = [];
    var count = 1;
    for(var item of items) {
      var fetch_result = await item.$$('div > div > div > div > a');
      // Skip cannot get contents
      if (fetch_result.length == 0) {
        continue;
      }
      var sentence = await(await (await fetch_result[0].getProperty('textContent')).jsonValue());
      var url = await (await fetch_result[0].getProperty('href')).jsonValue();
      // Is Article
      if(/^.*instagram.com\/p\/.*/.test(url) == true) {
        if(number_of_article < count){
          break;
        }
        console.log("Fetched... " + url);
        var x = {};
        x.url = url;
        // 50文字程度でcut
        x.sentence = sentence;

        x.image_url = await (await fetch_result[1].getProperty('href')).jsonValue();
        x.image_name = x.image_url.replace(/^https.*\/([^\/]+\.jpg).*$/, '$1');

        result.push(x);
        count++;
      }
    }

    browser.close();
    return result;
};