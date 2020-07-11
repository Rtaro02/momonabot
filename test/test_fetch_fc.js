var assert = require('chai').assert;

var f = require('../hello/fetch_fcnews.js');
const fc_news_url = 'https://www.up-fc.jp/helloproject/news.php';

describe('Hello の FCサイト検証', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(100000);
    var list;
    it('リストの長さは>0', async function () {
        list = (await f.fetch(fc_news_url));
        assert.isAbove(list.length, 0);
    });
    it('urlはhttps://www.up-fc.jp/helloproject/', async function () {
        for(var i of list) {
            assert.isTrue(/https:\/\/www.up-fc.jp\/helloproject.*/.test(i.url));
        }
    });
});