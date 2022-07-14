webix.protoUI({
    name: "nproperty",
    $cssName: "property",
    defaults: {
    },
    $init: function (config) {
        this.attachEvent("onAfterEditStart", function () {//html5 type設定
            var hash = this.getEditor().config.attr;
            if (this.getEditor().config.attr != {}) {
                Object.keys(hash).map(key => this.getEditor().getInputNode().setAttribute(key, hash[key]));
            }
        });
    }
}, webix.ui.property, webix.ValidateData);
webix.protoUI({
    name: "yen",
    $cssName: "text",
    defaults: {
        format:"1,111",
        attribute:{
            type:"number"
        }
    },
    $init: function (config) {
        this.attachEvent("onFocus", function () {//html5 type設定
            this.getInputNode().select();
        });
    }
}, webix.ui.text);
