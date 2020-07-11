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
    // Maybe Angerme group topic
    return true;
}