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
  if (is("String", inDate)) {
    var date = new Date(inDate.replace(/-/g, '/'));
  } else
    if (is("Date", inDate)) {
      var date = inDate;
    } else {
      var date = new Date(inDate);
    }
  // * J : 元号
  // * b : 元号略称
  // * K : 和暦年(1年を元年と表記)
  // * k : 和暦年
  var strWeek = ['日', '月', '火', '水', '木', '金', '土'];
  var gengoList = [
    { 'name': '令和', 'name_short': 'R', 'name_short_k': '令', 'date': '2019/05/01 00:00:00' },
    { 'name': '平成', 'name_short': 'H', 'name_short_k': '平', 'date': '1989/01/08 00:00:00' },
    { 'name': '昭和', 'name_short': 'S', 'name_short_k': '昭', 'date': '1926/12/25 00:00:00' },
    { 'name': '大正', 'name_short': 'T', 'name_short_k': '大', 'date': '1912/07/30 00:00:00' },
    { 'name': '明治', 'name_short': 'M', 'name_short_k': '明', 'date': '1868/01/25 00:00:00' }
  ];
  var arrGengo;
  var tDate;
  gengoList.some(function (val, index) {
    tDate = new Date(val.date);
    arrGengo = val;
    if (date >= tDate) return true;
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
// 【汎用】配列に格納されたオブジェクトより、複数の指定項目のみの配列を返却する
// @param array arr datatable.getItem等で取得した配列
// @param string/array param 配列名称(抽出名、抽出名：別名)
// @return array 指定項目のみの配列
Conversion.arrColObj2 = function (arr, param) {
  var _rtn = [];
  if (!$.isArray(param)) param = [param];
  $.each(arr, function (index, val) {
    _obj = {};
    $.each(param, function (indexP, valP) {
      var _k = valP.split(":")[0];
      var _nk = valP.split(":")[1] || _k;
      if (!val[_k]) {
        _obj[_nk] = "";
      } else {
        _obj[_nk] = val[_k];
      }
    });
    _rtn.push(_obj);
  });
  return _rtn;
};
/**
 * arrayとIDを基に名称を取得
 * @param  object  obj   配列（[{id,value}]が含まれる形式）
 * @param  string  id    ID
 * @param  string  rtnId 返却するＩＤ（デフォルト:value）
 * @return string  value 名称
 */
 Conversion.arrayGetValue = function(obj, id, rtnId){
  var rtn;
  if(!obj) return "";
  if(id===undefined || id===null || id==="") return "";
  rtnId = rtnId || "value";
  var rtn = "";
  $.each(obj, function(index, val) {
    if(id == val.id){
      rtn=val[rtnId];
      return false;
    }
  });
  return rtn;
};