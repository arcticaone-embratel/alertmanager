require([
    "splunkjs/mvc",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml"
], function(mvc, _, $) {

    var FormUtils = require("splunkjs/mvc/simpleform/formutils");
    var SubmitButton = require("splunkjs/mvc/simpleform/input/submit");

    var jData = [{"CLIENTE":"CLIENTE 1","TOT":12,"UP":10,"DN":10,"PAR":10,"ERR":10,"LAT":10,"PAC":10,"INT":10,"CHKO":10,"CHKN":10,"TTS":10,"D1":10,"D2":10,"D3":10,"D4":10,"D5":10,"D5MAIS":10,"SAG":"(link)","GRAF":"(link)","BDI":"(link)","BD":"(link)"},
                 {"CLIENTE":"CLIENTE 2","TOT":10,"UP":14,"DN":15,"PAR":10,"ERR":10,"LAT":10,"PAC":10,"INT":10,"CHKO":10,"CHKN":10,"TTS":10,"D1":10,"D2":10,"D3":10,"D4":10,"D5":10,"D5MAIS":10,"SAG":"(link)","GRAF":"(link)","BDI":"(link)","BD":"(link)"}];

  //alert(jData[0][0]);
  //var arrJSON = typeof jData != 'object' ? JSON.parse(jData) : jData;
  //var $headerTr = $('<tr/>');

  $.each(jData, function(i, item) {
    var sRow = '<tr>' +
        '<td>'+jData[i].CLIENTE+'</td>' +
        '<td>'+jData[i].TOT+'</td>' +
        '<td>'+jData[i].UP+'</td>' +
        '<td>'+jData[i].DN+'</td>' +
        '<td>'+jData[i].PAR+'</td>' +
        '<td>'+jData[i].ERR+'</td>' +
        '<td>'+jData[i].LAT+'</td>' +
        '<td>'+jData[i].PAC+'</td>' +
        '<td>'+jData[i].INT+'</td>' +
        '<td>'+jData[i].CHKO+'</td>' +
        '<td>'+jData[i].CHKN+'</td>' +
        '<td>'+jData[i].TTS+'</td>' +
        '<td>'+jData[i].D1+'</td>' +
        '<td>'+jData[i].D2+'</td>' +
        '<td>'+jData[i].D3+'</td>' +
        '<td>'+jData[i].D4+'</td>' +
        '<td>'+jData[i].D5+'</td>' +
        '<td>'+jData[i].D5MAIS+'</td>' +
        '<td><a href="#">img</a></td>' +
        '<td><a href="#">img</a></td>' +
        '<td><a href="#">img</a></td>' +
        '<td><a href="#">img</a></td>' +
        '</tr>';
        //alert(sRow);
        $("tbody#rows").append(sRow);

  });
  //$('body').append($table);

});
