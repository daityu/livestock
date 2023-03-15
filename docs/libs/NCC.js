var NCC = NCC || {};
NCC.datatable = NCC.datatable || {};
//【共通】左端チェックボックス時のスタイルシート変更
NCC.datatable.cssChange = function (row, col, val) {
  if (val) {
    this.addRowCss(row, "enabled");
  } else {
    this.removeRowCss(row, "enabled");
  }
};
// 件数
// @param string tblId datatableID
// @param string dispId 出力先ID
NCC.datatable.rowCount = function (tblId, dispId) {
  var items = $$(tblId).count();
  $$(dispId).setValue(items + "件");
};
// すべてのレコードを取得
// @param string tblId datatableID
// @param boolean isHideSend true:非表示項目を取得する ※tabviewで消えている項目は非表示になっているため、trueにする必要がある。
// @return array
NCC.datatable.getItemAll = function (tblId, isHideSend) {//未定義データもcolumnsに合わせて持っていきます
  var _result = [];
  isHideSend = isHideSend || false;
  if (!$$(tblId).isVisible() && !isHideSend) return _result;
  $$(tblId).data.each(function (obj) {
    _result.push(obj);
  }, this, true);
  return _result;
};
// SQLライクなフィルター
// @param string tblId datatableID
// @param array  param [["カラムID", "=", "値"]...] ※AND条件
//  第1引数:カラムID
//  第2引数:"="完全一致を抽出 "<>"不一致を抽出 "regex"正規表現で抽出
// @param objectまたはboolean オブジェクトの中身がある。または、trueの時のみ抽出判定を行う
NCC.datatable.filter = function (tblId, param, object) {
  if (arguments.length != 3) alert("NCC.datatable.filter指定エラー");
  var _state = $$(tblId).getState();
  $$(tblId).filter(function (obj) {
    var rtn = true;
    $.each(param, function (index, val) {
      var c = val[0];//カラム
      var o = val[1];//符号
      var v = val[2];//比較値
      switch (o) {
        case "="://完全一致
          var value = obj[c] + "";
          if (value != v) {
            rtn = false;
            return false;
          }
          break;
        case "<>"://不一致
          var value = obj[c] + "";
          if (value == v) {
            rtn = false;
            return false;
          }
          break;
        case "regex"://正規表現
          if (c != "*") {
            var value = obj[c] + "";
          } else {
            var _arr = [];
            $.each(obj, function (index, val) {
              if (is("String", val) && ($.inArray(index, _state.hidden) == -1)) _arr.push(val);
            });
            var value = _arr.join("|");
          }
          var regexp = new RegExp(v);
          if (!value.match(regexp)) {
            rtn = false;
            return false;
          }
          break;
        case "IN"://含む
          var value = obj[c] + "";
          var _l_rtn = false;
          $.each(v, function (index, val) {
            if (value == val) {//含む
              _l_rtn = true;
              return false;
            }
          });
          if (!_l_rtn) rtn = false;
          break;
        case "NOTIN"://含まない
        case "NOT IN":
          var value = obj[c] + "";
          $.each(v, function (index, val) {
            if (value == val) {
              rtn = false;
              return false;
            }
          });
          break;
        default:
          alert("NCC.datatable.filterの指定が異なります");
          break;
      }
    });
    var flg = (($.type(object) === "boolean" && object) || object && (!$.isEmptyObject(object))) && rtn;
    return flg;
  });
};
NCC.datepicker = NCC.datepicker || {};
// datepickerの日付を加減算する
// @param string datepickerId datepickerのID
// @param int addDay 加算する日付（マイナス可）
NCC.datepicker.addDate = function (datepickerId, addDay) {
  if (!datepickerId || !addDay) return;
  var date = Conversion.toDate($$(datepickerId).getValue());
  var _nd = Conversion.formatDate(date.setDate(date.getDate() + parseInt(addDay, 10)), "YYYY/MM/DD");
  $$(datepickerId).setValue(_nd);
};
// datepickerの年月を加減算する
// @param string datepickerId datepickerのID
// @param int addMonth 加算する年月（マイナス可）
NCC.datepicker.addMonth = function (datepickerId, addMonth) {
  if (!datepickerId || !addMonth) return;
  var date = Conversion.toDate($$(datepickerId).getValue());
  var _nd = Conversion.formatDate(date.setMonth(date.getMonth() + parseInt(addMonth, 10)), "YYYY/MM/1");
  $$(datepickerId).setValue(_nd);
};
NCC.datepicker.monthLayout = function (_id, _label, _param) {
  _id = _id || "";
  _label = _label || "";
  let _labelWidth = _label.length * 20;
  _param = _param || {};
  var _obj = {
    cols: [
      { view: "label", label: _label, width: _labelWidth, align: "right" },
      {
        view: "button", type: "icon", icon: "wxi-angle-left", width: 45, click: function (id, event) {
          NCC.datepicker.addMonth(_id, -1);
        }, tooltip: "前月へ"
      },
      { view: "ndatepicker", id: _id, type: "month", format: "%Y年%m月", value: new Date(), width: 200 },
      {
        view: "button", type: "icon", icon: "wxi-angle-right", width: 45, click: function (id, event) {
          NCC.datepicker.addMonth(_id, 1);
        }, tooltip: "翌月へ"
      },
      {}
    ]
  };
  return _obj;
};
NCC.array = NCC.array || {};
//変更前後のオブジェクト内容を比較する
//@param array/object nv 変更後オブジェクト
//@param array/object ov 変更前オブジェクト
//@return true:変更あり false：変更なし
NCC.array.isChange = function (nv, ov) {
  var result = false;
  $.each(nv, function (indexInArray, valueOfElement) {
    if ((ov[indexInArray] || "") != valueOfElement) {
      result = true;
      return false;
    }
  });
  return result;
}