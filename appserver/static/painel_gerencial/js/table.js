require([
    "splunkjs/mvc",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml"
], function(mvc, _, $) {

    var SearchManager = require("splunkjs/mvc/searchmanager");
    var TableView = require("splunkjs/mvc/tableview");

    var tableSearch = new SearchManager({
        id: "tableSearch",
        earliest_time: "-1m@m",
        latest_time: "now",
        preview: true,
        cache: false,
        search: "| `tabelaGerencialSearch`"
    });

    var mainTable = new TableView({
        id: "mainTable",
        managerid: "tableSearch",
        pageSize: "10",
        wrap: true,
        format: {
            "3D": [
                {
                    "type": "color",
                    "options": {
                        "list": ["#F8BE34"],
                        "threshold": ""
                    }
                }
            ]
        },
        el: $("div#tableContainer")
    });//.render();

var colMapping = {
    'Cliente': 'rgb(220,218,213)',//1
    'TOT': 'rgb(220,218,213)',//2
    'UP': 'rgb(146,208,80)',//3
    'DN': 'rgb(255,0,0)',//4
    'PAR': 'rgb(255,255,0)',//5
    'ERR': 'rgb(142,169,219)',//6
    'LAT': 'rgb(142,169,219)',//7
    'PAC': 'rgb(142,169,219)',//8
    'INT': 'rgb(142,169,219)',  //9
    'CHK_OK': 'rgb(255,230,153)',//10
    'CHK_NOK': 'rgb(255,230,153)',//11
    'TTS': 'rgb(255,192,0)',//12
    '1D': 'rgb(255,192,0)',//13
    '2D': 'rgb(255,192,0)',//14
    '3D': 'rgb(255,192,0)',//15
    '4D': 'rgb(255,192,0)',//16
    '5D': 'rgb(255,192,0)',//17
    '>5D': 'rgb(255,192,0)',//18
    'SAG': 'rgb(208,206,206)',//19
    'GRAF': 'rgb(208,206,206)',//20
    'BDI': 'rgb(208,206,206)',//21
    'BD': 'rgb(208,206,206)'//22
};

var TrocaCor = TableView.BaseCellRenderer.extend({ 
    canRender: function(cellData) {
        //console.log(cellData);                
        return true;//cellData.field === item;
    },
    render: function($td, cellData) {
        //alert("cellData: " + cellData.value);
        $td.css({ 'background-color': colMapping[cellData.field], 'color': 'black' }).html(cellData.value);
    }
});
mainTable.addCellRenderer(new TrocaCor());
mainTable.render();

var keys = Object.keys(colMapping);

for(var i=0; i < keys.length; i++) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'th[data-sort-key="' + keys[i] + '"] { background-color:' + colMapping[keys[i]] + ' !important;border: 0 !important; border-bottom:2px solid black !important;}';
    document.getElementsByTagName('head')[0].appendChild(style);
}    

});
