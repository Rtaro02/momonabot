var assert = require('assert');
var fetch_ameba = require('../ameba/fetch_ameba.js');
const MOMONA_URL = 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html';
const MUROTA_URL = 'https://ameblo.jp/angerme-ss-shin/theme-10087284995.html';

describe('アメブロ挙動確認', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(10000);
    it('桃奈ちゃんのURLをインプットするとURLが返却される', async function () {
        var actual = (await fetch_ameba.fetch(MOMONA_URL)).url;
        var regex = /^https:\/\/ameblo.jp\/angerme-ss-shin\/entry-.*$/;
        assert.strictEqual(regex.test(actual), true);
    });
    it('卒業メンバーのむろのURLを指定すると、URLが取得できる', async function () {
        var actual = (await fetch_ameba.fetch(MUROTA_URL)).url;
        var expected = 'https://ameblo.jp/angerme-ss-shin/entry-12584111667.html?frm=theme';
        assert.strictEqual(actual, expected);
    });
    it('卒業メンバーのむろのURLを指定すると、タイトルが取得できる', async function () {
        var actual = (await fetch_ameba.fetch(MUROTA_URL)).title;
        var expected = 'ありがとうございました！ 室田瑞希';
        assert.strictEqual(actual, expected);
    });
    it('桃奈ちゃんのURLをインプットするとURLが返却される', async function () {
        var actual = (await fetch_ameba.fast_fetch(MOMONA_URL)).url;
        var regex = /^https:\/\/ameblo.jp\/angerme-ss-shin\/entry-.*$/;
        assert.strictEqual(regex.test(actual), true);
    });
});


describe('過去ブログテスト', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(100000);
    it('0917は19, 18, 17, 16と毎年ブログを投稿している', async function () {
        var date = new Date("2020-09-17");
        for(var year of [2016, 2017, 2018, 2019]) {
            var actual = (await fetch_ameba.fetch_old_momona_post(date, year));
            assert.strictEqual(actual.length, 1);
        }
    });
});