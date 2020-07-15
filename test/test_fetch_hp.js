var assert = require('chai').assert;

var f = require('../hello/fetch_hpnews.js');
const hp_news_url = 'http://www.helloproject.com/news/';

describe('Hello の HPサイト検証', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(100000);
    var list;
    it('リストの長さは>0', async function () {
        list = (await f.fetch(hp_news_url));
        assert.isAbove(list.length, 0);
    });
    it('urlは\'http://www.helloproject.com\'', async function () {
        for(var i of list) {
            assert.isTrue(/http:\/\/www.helloproject.com/.test(i.url));
        }
    });
});
