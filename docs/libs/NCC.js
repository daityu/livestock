var NCC = NCC || {};
NCC.datatable = NCC.datatable || {};
//【共通】左端チェックボックス時のスタイルシート変更
NCC.datatable.cssChange  = function(row, col, val){
  if(val){
      this.addRowCss(row, "enabled");
  } else {
      this.removeRowCss(row, "enabled");
  }
};
// 件数
// @param string tblId datatableID
// @param string dispId 出力先ID
NCC.datatable.rowCount = function(tblId, dispId){
  var items   = $$(tblId).count();
  $$(dispId).setValue(items + "件");
};
// すべてのレコードを取得
// @param string tblId datatableID
// @param boolean isHideSend true:非表示項目を取得する ※tabviewで消えている項目は非表示になっているため、trueにする必要がある。
// @return array
NCC.datatable.getItemAll = function(tblId, isHideSend){//未定義データもcolumnsに合わせて持っていきます
  var _result = [];
  isHideSend = isHideSend || false;
  if(!$$(tblId).isVisible() && !isHideSend) return _result;
  $$(tblId).data.each(function(obj){
      _result.push(obj);
  }, this, true);
  return _result;
};
NCC.datepicker = NCC.datepicker || {};
// datepickerの日付を加減算する
// @param string datepickerId datepickerのID
// @param int addDay 加算する日付（マイナス可）
NCC.datepicker.addDate = function (datepickerId, addDay) {
  if (!datepickerId || !addDay) return;
  var date = new Date($$(datepickerId).getValue());
  var _nd = Conversion.formatDate(date.setDate(date.getDate() + parseInt(addDay, 10)), "YYYY/MM/DD");
  $$(datepickerId).setValue(_nd);
};
// datepickerの年月を加減算する
// @param string datepickerId datepickerのID
// @param int addMonth 加算する年月（マイナス可）
NCC.datepicker.addMonth = function (datepickerId, addMonth) {
  if (!datepickerId || !addMonth) return;
  var date = new Date($$(datepickerId).getValue());
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
      { view: "label", label: _label, width:_labelWidth, align:"right" },
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