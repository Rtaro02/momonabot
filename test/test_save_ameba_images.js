var assert = require('assert');
var fs = require('fs');
var fetch_ameba = require('../ameba/save_ameba_images.js');

describe('アメブロ画像保存', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(20000);
    it('2020-07-12の莉佳子ちゃんのURLをインプットすると画像名が返却される', async function () {
        var actual = (await fetch_ameba.save('https://ameblo.jp/angerme-ss-shin/entry-12610610350.html?frm=theme'));
        assert.strictEqual(actual.names.length, 3);
        assert.strictEqual(actual.names[0], 'o0958127814788062073.jpg');
        assert.strictEqual(actual.names[1], 'o1080144014788062087.jpg');
        assert.strictEqual(actual.names[2], 'o0958127814788062103.jpg');
    });
    it('2020-07-13の桃奈ちゃんはaタグが画像の前にあるけど画像が取れる', async function () {
        var actual = (await fetch_ameba.save('https://ameblo.jp/angerme-ss-shin/entry-12610818468.html?frm=theme'));
        assert.strictEqual(actual.names.length, 1);
        assert.strictEqual(actual.names[0], 'o1080080914788530830.jpg');
    });
    it('2021-02-11の桃奈ちゃんのURLをインプットすると画像名が返却される（divの構造が違うので取れなかった）', async function () {
        var actual = (await fetch_ameba.save('https://ameblo.jp/angerme-ss-shin/entry-12656064338.html?frm=theme'));
        assert.strictEqual(actual.names.length, 3);
        assert.strictEqual(actual.names[0], 'o1080144014894872865.jpg');
        assert.strictEqual(actual.names[1], 'o1080144014894872879.jpg');
        assert.strictEqual(actual.names[2], 'o1080144014894872886.jpg');
    });
    it('2021-02-13のなりんちゃんのURLをインプットすると画像名が返却される(articleの構造が違うので取れなかった)', async function () {
        var actual = (await fetch_ameba.save('https://ameblo.jp/angerme-new/entry-12656491731.html?frm=theme'));
        assert.strictEqual(actual.names.length, 1);
        assert.strictEqual(actual.names[0], 'o1478110814895911204.jpg');
    });
});