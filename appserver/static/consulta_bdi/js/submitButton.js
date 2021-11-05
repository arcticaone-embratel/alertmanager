require([
    "splunkjs/mvc",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml"
], function(mvc, _, $) {

    var FormUtils = require("splunkjs/mvc/simpleform/formutils");
    var SubmitButton = require("splunkjs/mvc/simpleform/input/submit");

    function submitTokens() {
        FormUtils.submitForm({ replaceState: pageLoading });
    }

    var container = $("<div/>");
    container.attr("id", "submitContainer");

    var button = $("<button/>");
    button.attr("class", "btn btn-primary submit");
    button.text("Pesquisar");

    container.append(button);
    $("div#filterPanel-fieldset").append(container);

    var submit = new SubmitButton({
        id: 'submit',
        el: $('div#submitContainer')
    }, {tokens: true}).render();

    submit.on("submit", function() {
        submitTokens();
    });

});
