const URL = 'https://www.instagram.com/angerme_official/';
const INSTAGRAM_RUNNER = require('./run_instagram.js');
const URLs = [
    // Cute
    "https://www.instagram.com/maimiyajima_official_uf/", // Maimi
    "https://www.instagram.com/saki__nakajima__uf/", // Saki
    "https://www.instagram.com/airisuzuki_official_uf/", // Airi
    // Morning
    "https://www.instagram.com/sayumimichishige0713/", // Sayumi
    "https://www.instagram.com/mizuki_fukumura.official/", // Mizuki
    "https://www.instagram.com/erina_ikuta.official/", // Erina
    "https://www.instagram.com/ayumi_ishida.official/", // Ayumi
    "https://www.instagram.com/akane__haga.official/", // Akane
    "https://www.instagram.com/maria_makino.official/", // Maria
    "https://www.instagram.com/miki_nonaka.official/", // Nonaka
    "https://www.instagram.com/kaede_kaga.official/", // Kaga
    "https://www.instagram.com/reina_yokoyama.official/", // Yokoyama
    "https://www.instagram.com/chisaki__morito.official/", // Morito
    // Angerme
    "https://www.instagram.com/akari_takeuchi.official/", // Akari
    "https://www.instagram.com/rikako_sasaki.official/", // Rikaco
    "https://www.instagram.com/moe_kamikokuryo.official/", // Moe
    "https://www.instagram.com/ayano_kawamura.official/", // Ayano
    // Angerme OG
    "https://www.instagram.com/ayaka.wada.official/", // Ayaka
    "https://www.instagram.com/kanon_fukuda/", //Kanon
    "https://www.instagram.com/rinakatsuta/", // Rina
    "https://www.instagram.com/tamura_meimi/", // Meimi
    "https://www.instagram.com/nakanishi_kana_/", // Kana
    "https://www.instagram.com/mahoaikawa3/", // Maho
    // Juice
    "https://www.instagram.com/yuka_miyazaki.official/", // Yuka
    "https://www.instagram.com/tomoko_kanazawa.official/", // Tomoko
    "https://www.instagram.com/sayuki_takagi.official/", // Takagi
    "https://www.instagram.com/karin_miyamoto.official/", // Karin
    "https://www.instagram.com/akari_uemura.official/", // Akari
    "https://www.instagram.com/manaka_inaba.official/", // Inaba
    "https://www.instagram.com/rei_inoue.official/", // Inoue
    "https://www.instagram.com/ruru_dambara.official/", // Ruru
    // Tsubaki
    "https://www.instagram.com/riko_yamagishi.official/", // Yamagishi
    "https://www.instagram.com/kisora_niinuma.official/", // Ninuma
    "https://www.instagram.com/saori_onoda.official/", // Onoda
    "https://www.instagram.com/mizuho_ono.official/", // Onoda
    "https://www.instagram.com/ami_tanimoto.official/", // Ami
    "https://www.instagram.com/yumeno_kishimoto.official/", // Yumeno
    "https://www.instagram.com/kiki_asakura.official/" // Kiki
]

exports.run = async function() {
  for(var url of URLs){
    console.log("Checking " + url)
    await INSTAGRAM_RUNNER.run(url, 3, true);
  }
}