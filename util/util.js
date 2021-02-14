exports.isMomonaOrAngermeTopic = function(x) {
    // If x includes momona, this sentence have momona topic even if other members name is there.
    if((/笠原/).test(x)) return true;
    if((/桃奈/).test(x)) return true;
    // Other members
    if((/竹内/).test(x)) return false;
    if((/朱莉/).test(x)) return false;
    if((/川村/).test(x)) return false;
    if((/文乃/).test(x)) return false;
    if((/佐々木/).test(x)) return false;
    if((/莉佳子/).test(x)) return false;
    if((/上國料/).test(x)) return false;
    if((/萌衣/).test(x)) return false;
    if((/船木/).test(x)) return false;
    if((/結/).test(x)) return false;
    if((/太田/).test(x)) return false;
    if((/遥/).test(x)) return false;
    if((/伊勢/).test(x)) return false;
    if((/鈴蘭/).test(x)) return false;
    if((/橋迫/).test(x)) return false;
    if((/鈴/).test(x)) return false;
    if((/川名/).test(x)) return false;
    if((/凜/).test(x)) return false;
    if((/為永/).test(x)) return false;
    if((/幸音/).test(x)) return false;
    if((/松本/).test(x)) return false;
    if((/わかな/).test(x)) return false;
    // Maybe Angerme group topic
    return true;
}

const KANJI_KASAHARA = /笠原/;
const KANJI_MOMONA = /桃奈/;
const KANA_KASAHARA = /[かカｶ][さサｻ][はハﾊ][らラﾗ]/;
const KANA_MOMONA = /[もモﾓ][もモﾓ][なナﾅ]/;
const KASA_CHAN = /[かカｶ][さサｻ][ちチﾁ][ゃャｬ][んンﾝ]/;
const ROMAJI_KASAHARA = /[Kk][Aa][Ss][Aa][Hh][Aa][Rr][Aa]/;
const ROMAJI_MOMONA = /[Mm][Oo][Mm][Oo][Nn][Aa]/;
const KANA_KASSA = /[かカｶ][っッｯ][さサｻ]/;
const KAMIKASA = /[かカｶ][みミﾐ][かカｶ][さサｻ]/;

exports.confirm_include_momona_name = function(honbun) {
  console.log(honbun)
  if(KANJI_KASAHARA.test(honbun)) return true;
  if(KANJI_MOMONA.test(honbun)) return true;
  if(KANA_KASAHARA.test(honbun)) return true;
  if(KANA_MOMONA.test(honbun)) return true;
  if(KASA_CHAN.test(honbun)) return true;
  if(ROMAJI_KASAHARA.test(honbun)) return true;
  if(ROMAJI_MOMONA.test(honbun)) return true;
  if(KANA_KASSA.test(honbun)) return true;
  if(KAMIKASA.test(honbun)) return true;
  return false;
}
