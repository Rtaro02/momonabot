const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
const { confirm_include_momona_name } = require('../util/util');

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
    console.log(await page.title());
    const button = await page.$('button[ga="provider-submit"]');
    await button.click();
    console.log("Transfer");
    // await page.waitFor('div[ga=feed-overview-preview]');
    await page.waitFor(10000);
    console.log(await page.title());
    await page.screenshot({ path: 'screenshot.png' });


    var items = await page.$$('div[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"]');
    var result = [];
    var count = 1;
    for(var item of items) {
      var fetch_result = await item.$$('div > div > div > div');
      // Skip cannot get contents
      if (fetch_result.length == 0) continue;

      var a_tag = await fetch_result[0].$('a');
      // Skip there are no a tag.
      if (a_tag == null || a_tag == undefined) continue;

      // Get URL
      var url = await (await a_tag.getProperty('href')).jsonValue();

      // Is Article
      if(/^.*instagram.com\/p\/.*/.test(url) == true) {
        if(number_of_article < count){
          break;
        }
        console.log("Fetched... " + url);
        var x = {};
        x.url = url;

        var image_sentence = await fetch_result[0].$('div > div');
        x.sentence = (await (await (await image_sentence.$('div')).getProperty('textContent')).jsonValue())
                      .replace(/^[ \.\n]*/, '') // Remove unnecessary prefix.
                      .replace(/Image enclosedinstagram.com.*$/, ''); // Remove unnecessary
        x.image_url =  await (await (await image_sentence.$('img')).getProperty('src')).jsonValue();
        x.image_name = x.image_url.replace(/^https.*\/([^\/]+\.jpg).*$/, '$1');

        result.push(x);
        count++;
      }
    }

    browser.close();
    return result;
};