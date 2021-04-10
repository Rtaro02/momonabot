var assert = require('assert');
var fetch_instagram = require('../instagram/fetch_instagram.js');
const URL = 'https://www.instagram.com/angerme_official/';

describe('Instagram挙動確認', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(100000);
    var result;
    it('4件のインスタ記事が取得できる', async function () {
        result = (await fetch_instagram.fetch(URL, 4));
        assert.strictEqual(result.length, 4);
    });
    it('URLはインスタのもの', async function () {
        regex = /^https:\/\/www.instagram.com.*$/;
        assert.strictEqual(regex.test(result[0].url), true);
    });
    it('画像はCDNのURL', async function () {
        regex = /^https:\/\/.*cdninstagram.com.*$/;
        assert.strictEqual(regex.test(result[0].image_urls[0]), true);
    });
    it('画像名は.jpg', async function () {
        regex = /^[0-9a-z_]+\.jpg$/;
        assert.strictEqual(regex.test(result[0].image_names[0]), true);
    });
});

