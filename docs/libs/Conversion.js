//変換系スクリプト関数
var Conversion = Conversion || {};
/**
 * 日付をフォーマットする
 * @param  {Date|string}   inDate     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
 Conversion.formatDate = function (inDate, format) {
    //入力チェック
    if(is("String", inDate)){
        var date = new Date(inDate.replace(/-/g, '/'));
    } else
    if(is("Date", inDate)){
        var date = inDate;
    } else {
        var date = new Date(inDate);
    }
    // * J : 元号
    // * b : 元号略称
    // * K : 和暦年(1年を元年と表記)
    // * k : 和暦年
    var strWeek = ['日','月','火','水','木','金','土'];
    var gengoList = [
        {'name': '令和', 'name_short': 'R', 'name_short_k': '令', 'date':'2019/05/01 00:00:00'},
        {'name': '平成', 'name_short': 'H', 'name_short_k': '平', 'date':'1989/01/08 00:00:00'},
        {'name': '昭和', 'name_short': 'S', 'name_short_k': '昭','date':'1926/12/25 00:00:00'},
        {'name': '大正', 'name_short': 'T', 'name_short_k': '大','date':'1912/07/30 00:00:00'},
        {'name': '明治', 'name_short': 'M', 'name_short_k': '明','date':'1868/01/25 00:00:00'}
    ];
    var arrGengo;
    var tDate;
    gengoList.some(function(val,index){
        tDate = new Date(val.date);
        arrGengo = val;
        if(date >= tDate) return true;
    });
    if (!format) format = 'YYYY/MM/DD hh:mm:ss';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/JK/g, arrGengo.name + (date.getFullYear() - tDate.getFullYear() + 1));
    format = format.replace(/jK/g, arrGengo.name_short_k + (date.getFullYear() - tDate.getFullYear() + 1));
    format = format.replace(/bK/g, arrGengo.name_short + (date.getFullYear() - tDate.getFullYear() + 1));
    format = format.replace(/ZMM/g, (date.getMonth() + 1));
    format = format.replace(/ZDD/g, (date.getDate()));
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/JW/g, strWeek[date.getDay()]);
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
};
