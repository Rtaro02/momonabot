var assert = require('assert');
var fs = require('fs');
var fetch_ameba = require('../ameba/save_ameba_images.js');

describe('アメブロ画像保存', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(20000);
    var actual;
    it('2020-07-12の莉佳子ちゃんのURLをインプットすると画像は三枚', async function () {
        actual = (await fetch_ameba.save('https://ameblo.jp/angerme-ss-shin/entry-12610610350.html?frm=theme'));
        assert.strictEqual(actual.names.length, 3);
    });
    it('2020-07-12の莉佳子ちゃんのURLをインプットすると画像名が返却される', async function () {
        assert.strictEqual(actual.names[0], 'o0958127814788062073.jpg');
        assert.strictEqual(actual.names[1], 'o1080144014788062087.jpg');
        assert.strictEqual(actual.names[2], 'o0958127814788062103.jpg');
    });
    it('2020-07-13の桃奈ちゃんはaタグが画像の前にあるけど画像が取れる', async function () {
        actual = (await fetch_ameba.save('https://ameblo.jp/angerme-ss-shin/entry-12610818468.html?frm=theme'));
        assert.strictEqual(actual.names[0], 'o1080080914788530830.jpg');
    });
});
