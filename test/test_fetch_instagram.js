var assert = require('assert');
var fetch_ameba = require('../instagram/fetch_instagram.js');
const URL = 'https://www.instagram.com/accounts/login/?next=/angerme_official/';

describe('Instagram挙動確認', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(100000);
    var result;
    it('1件のインスタ記事が取得できる', async function () {
        result = (await fetch_ameba.fetch("https://www.instagram.com/angerme_official/", 1));
        assert.strictEqual(result.length, 1);
    });
    it('URLはインスタのもの', async function () {
        regex = /^https:\/\/www.instagram.com.*$/;
        assert.strictEqual(regex.test(result[0].url), true);
    });
    // it('画像が1件以上取得できている', async function () {
    //     regex = /^https:\/\/www.instagram.com.*$/;
    //     assert.equal(result[0].images.length > 0, true);
    // });
    // it('画像はCDNのURL', async function () {
    //     regex = /^[a-z0-9_]+.jpg$/;
    //     assert.equal(regex.test(result[0].images[0]), true);
    // });
    // it('件数未指定では3件のインスタ記事が取得できる', async function () {
    //     result = (await fetch_ameba.fetch(URL));
    //     assert.equal(result.length, 3);
    // });
});

