var NCC = NCC || {};
NCC.datepicker = NCC.datepicker || {};
// datepickerの日付を加減算する
// @param string datepickerId datepickerのID
// @param int addDay 加算する日付（マイナス可）
NCC.datepicker.addDate = function(datepickerId, addDay){
  if(!datepickerId || !addDay) return;
  var date  = new Date($$(datepickerId).getValue());
  var _nd   = Conversion.formatDate(date.setDate(date.getDate() + parseInt(addDay, 10)), "YYYY/MM/DD");
  $$(datepickerId).setValue(_nd);
};
// datepickerの年月を加減算する
// @param string datepickerId datepickerのID
// @param int addMonth 加算する年月（マイナス可）
NCC.datepicker.addMonth = function(datepickerId, addMonth){
  if(!datepickerId || !addMonth) return;
  var date  = new Date($$(datepickerId).getValue());
  var _nd   = Conversion.formatDate(date.setMonth(date.getMonth() + parseInt(addMonth, 10)), "YYYY/MM/1");
  $$(datepickerId).setValue(_nd);
};