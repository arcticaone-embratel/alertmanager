require([
    "splunkjs/mvc",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml"
], function(mvc, _, $) {

    $("div.input-multiselect").each(function(index){

        var currentInput = mvc.Components.get($(this).attr("id"));

        currentInput.on("change", function(value, object){

            if(value[0] === "*" && value.length > 1) {
                currentInput.val(value.slice(1));
            }

            else if (value[value.length - 1] === "*" && value.length > 1) {
                currentInput.val(["*"]);
            }
        });
    });
});
