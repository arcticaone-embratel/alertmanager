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
        drilldown: "none",
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

var conteudo = ''; var cliente = '';

var TrocaCor = TableView.BaseCellRenderer.extend({ 
    canRender: function(cellData) {
        //console.log(cellData);                
        return true;//cellData.field === item;
    },
    render: function($td, cellData) {

        if (cellData.field=='Cliente')        
            cliente = cellData.value;
        //alert("cellData: " + cellData.value);

        conteudo = cellData.value;
        if (conteudo=='icone')
        {
            conteudo = `<a href="teste.html" onclick="alert('${cliente}');">icone</a>`;

            if (cellData.field=='SAG')
                conteudo = `<a href="teste.html" onclick="alert('${cliente}');">desativado</a>`;
            if (cellData.field=='BD')
                conteudo = `<a href="teste.html" onclick="alert('${cliente}');">desativado</a>`;
//incident_posture?form.global_time.earliest=-7d&form.global_time.latest=now&form.owner=*&form.status=status!%3D%22*resolved%22%20status!%3D%22suppressed%22%20status!%3D%22closed*%22%20status!%3D%22cancelled*%22&form.s_incident_id=&form.s_title=&form.impact=Performance&form.empresa=ICATU%20SEGUROS%20S.A.&form.estado=*&form.flag_normalizado=N%C3%A3o&hideFilters=false
            if (cellData.field=='BDI')//${cliente}
                conteudo = `<a href="#" onclick="window.open('entrega_bdi?form.cliente=${cliente}&form.solucao=');">BDI</a>`;

            
        }
            
        $td.css({ 'background-color': colMapping[cellData.field], 'color': 'black' }).html(conteudo);
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
