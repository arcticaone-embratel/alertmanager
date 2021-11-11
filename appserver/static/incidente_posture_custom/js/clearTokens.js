require([
    "splunkjs/mvc",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml"
], function(mvc, _, $) {

    $(document).ready(function() {
        $(".show-global-filters").val('mostrar filtros');
    });

    var defaultTokens = mvc.Components.get("default");
    var submittedTokens = mvc.Components.get("submitted");
    
    var inputs = Object.keys(mvc.Components.attributes).filter(function(val) {
        return /customInput[A-Za-z0-9]+$/i.test(val);
    });

    var customButton = $("<button/>");
    customButton.attr("class", "btn btn-primary");
    customButton.text("Limpar Filtros");

    customButton.on("click", function(){      

        for (var i=0; i < inputs.length; i++) {

            var currentInput = mvc.Components.get(inputs[i]);
            currentInput.val(currentInput.settings.attributes.default);
        }

        submittedTokens.set("urlSearch", ""); 
        defaultTokens.set("urlSearch", "");
    });

    var clearTokensButton = $("<div/>");
    clearTokensButton.css({"display": "inline-block"});
    clearTokensButton.append(customButton);

    $("div.fieldset.dashboard-form-globalfieldset a.hide-global-filters").before(clearTokensButton);

});
