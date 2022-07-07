webix.protoUI({
    name: "nproperty",
    $cssName: "property",
    defaults: {
    },
    $init: function (config) {
        this.attachEvent("onAfterEditStart", function () {
            var hash = this.getEditor().config.attr;
            if (this.getEditor().config.attr != {}) {
                Object.keys(hash).map(key => this.getEditor().getInputNode().setAttribute(key, hash[key]));
            }
        });
    }
}, webix.ui.property, webix.ValidateData);
