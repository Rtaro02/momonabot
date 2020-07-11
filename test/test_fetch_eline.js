var assert = require('chai').assert;

var f = require('../eline/fetch_eline.js');
const eline_angerme_url = 'https://www.elineupmall.com/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=%E3%82%A2%E3%83%B3%E3%82%B8%E3%83%A5%E3%83%AB%E3%83%A0&dispatch=products.search&page=';

describe('elineupmallサイト検証', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(100000);
    var list;
    it('リストの長さは>0', async function () {
        list = (await f.fetch(eline_angerme_url, 1));
        assert.isAbove(list.length, 0);
    });
    it('urlはhttps://www.elineupmall', async function () {
        for(var i of list) {
            assert.isTrue(/https:\/\/www.elineupmall.*/.test(i.url));
        }
    });
});