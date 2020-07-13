var assert = require('assert');
var fetch_ameba = require('../ameba/fetch_other_members.js');
const RIKACO_URL = 'https://ameblo.jp/angerme-ss-shin/entry-12606828457.html?frm=theme'

describe('他のメンバーの桃奈ちゃん言及チェック', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(10000);
    it('20200624のふなっきのブログには笠原が入っている', async function () {
        var url = 'https://ameblo.jp/angerme-ss-shin/entry-12606619037.html';
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, true);
    });
    it('20200625のささっきのブログはかっさーにふれていない', async function () {
        var url = 'https://ameblo.jp/angerme-ss-shin/entry-12606828457.html';
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, false);
    });
    it('20170616のたけブログではももなっていっている', async function () {
        var url = 'https://ameblo.jp/angerme-amerika/entry-12284254745.html';
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, true);
    });
    it('20190121のいせブログでは笠原っていっている', async function () {
        var url = 'https://ameblo.jp/angerme-new/entry-12434593254.html';
        var actual = await fetch_ameba.check_momona_existence(url);
        assert.equal(actual, true);
    });
});
