require([
    "splunkjs/mvc",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml"
], function(mvc, _, $) {

    var submittedTokens = mvc.Components.get("submitted");

    if(submittedTokens.get("urlSearch") === undefined) {
        submittedTokens.set("urlSearch", "");
    }
});
