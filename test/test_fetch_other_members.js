var assert = require('assert');
var fetch_ameba = require('../ameba/fetch_other_members.js');
const RIKACO_URL = "https://ameblo.jp/angerme-ss-shin/entry-12606828457.html?frm=theme"

describe('本文のももちゃんチェッカー', function () {
    // テストのタイムアウトを10sec.に設定
    it('笠原にひっかかる', function () {
        assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！笠原です！！！！"), true);
    });
    it('桃奈にひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！桃奈です！！！！"), true);
    });
    it('カサハラにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！カサハラれす！！！！"), true);
    });
    it('モモナにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！カモモナ！！！"), true);
    });
    it('ｶｻﾊﾗにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！ｶｻﾊﾗ！！！"), true);
    });
    it('ﾓﾓﾅにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！ﾓﾓﾅ！！！"), true);
    });
    it('かさはらにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！かさはら！！！"), true);
    });
    it('ももなにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！ももな！！！"), true);
    });
    it('KASAHARAにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！KASAHARA！！！"), true);
    });
    it('kasaharaにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！kasahara！！！"), true);
    });
    it('Kasaharaにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！Kasahara！！！"), true);
    });
    it('kaSaHAraにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！kaSaHAra！！！"), true);
    });
    it('MOMONAにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！MOMONA！！！"), true);
    });
    it('momonaにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！momona！！！"), true);
    });
    it('Momonaにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！Momona！！！"), true);
    });
    it('moMonaにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！moMona！！！"), true);
    });
    it('かっさーにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！かっさー！！！"), true);
    });
    it('カッサーにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！カッサー！！！"), true);
    });
    it('ｶｯｻｰにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！ｶｯｻｰ！！！"), true);
    });
    it('カサナラにひっかからない', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！カサナラれす！！！！"), false);
    });
    it('ももちゃんにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！ももちゃん！！！！"), true);
    });
    it('モモちゃんにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！モモちゃん！！！！"), true);
    });
    it('ﾓﾓﾁｬﾝにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！ﾓﾓﾁｬﾝ！！！！"), true);
    });
    it('かみかさにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！かみかさ！！！！"), true);
    });
    it('ｶﾐｶｻにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！ｶﾐｶｻ！！！！"), true);
    });
    it('カサハラにひっかかる', function () {
       assert.equal(fetch_ameba.confirm_include_momona_name("こんばんは！！！カサハラ！！！！"), true);
    });
});
describe('URLで直接チェック', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(10000);
    it('20200624のふなっきのブログには笠原が入っている', async function () {
        var url = "https://ameblo.jp/angerme-ss-shin/entry-12606619037.html";
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, true);
    });
    it('20200625のささっきのブログはかっさーにふれていない', async function () {
        var url = "https://ameblo.jp/angerme-ss-shin/entry-12606828457.html";
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, false);
    });
    it('20170616のたけブログではももなっていっている', async function () {
        var url = "https://ameblo.jp/angerme-amerika/entry-12284254745.html";
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, true);
    });
    it('20190121のいせブログでは笠原っていっている', async function () {
        var url = "https://ameblo.jp/angerme-new/entry-12434593254.html";
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, true);
    });
});