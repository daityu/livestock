webix.protoUI({
    name: "ndatepicker",
    $cssName: "datepicker",
    defaults: {
        // stringResult: true
        css:"fsL"
    },
}, webix.ui.datepicker);
// webix.protoUI({
//     name: "nproperty",
//     $cssName: "property",
//     defaults: {
//     },
//     $init: function (config) {
//         this.attachEvent("onAfterEditStart", function () {//html5 type設定
//             var hash = this.getEditor().config.attr;
//             if (this.getEditor().config.attr != {}) {
//                 Object.keys(hash).map(key => this.getEditor().getInputNode().setAttribute(key, hash[key]));
//             }
//         });
//     }
// }, webix.ui.property, webix.ValidateData);
webix.protoUI({//金額（整数）専用
    name: "yen",
    $cssName: "text",
    defaults: {
        format: "1,111",
        attributes: {
            type: "text",
            inputmode: "decimal"
        }
    },
    $init: function (config) {
        this.attachEvent("onFocus", function () {//html5 type設定
            this.getInputNode().select();
        });
        this.attachEvent("onBlur", function () {//変換エラー時は削除
            if (this.getValue() == "NaN") {
                this.setValue("");
            }
        });
    }
}, webix.ui.text);
webix.protoUI({//数値（小数点以下）専用
    name: "num",
    defaults: {
        format: "1,111.00"
    },
}, webix.ui.yen);
webix.protoUI({//数字専用
    name: "numtext",
    defaults: {
        format: "1111"
    },
}, webix.ui.yen);
