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

    var mainTable = new TableView({
        id: "mainTable",
        drilldown: "cell",
        managerid: "tableSearch",
        pageSize: "10",
        wrap: true,
        fields: Object.keys(colMapping),
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

var conteudo = ''; var cliente = '';

function Epoch(horas)
{
    return (Date.now()/1000)-(horas*60*60);
}

function urlMapper(field, obj, args) {

    if (field == "GRAF") {
        return obj.data["row.URL"];
    }

    else {
        return "/en-US/app/alert_manager/incident_posture?" + args;
    }
}

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
            console.log()
            if (cellData.field=='SAG')
                conteudo = `<i class="icomoon-save-disk" />`;
                //conteudo = `<img src="/static/app/alert_manager/painel_gerencial/img/SAG.png" />`;
                
            if (cellData.field=='BD')
                conteudo = `<i class="icomoon-folder" />`;
                //conteudo = `<img src="/static/app/alert_manager/painel_gerencial/img/BD.png" />`;
                
            if (cellData.field=='BDI')
                conteudo = `<i class="icomoon-cabinet" />`;
                //conteudo = `<img src="/static/app/alert_manager/painel_gerencial/img/BDI.png" />`;
                
            if (cellData.field=='GRAF')
                conteudo = `<i class="icomoon-bar-graph" />`;
                //conteudo = `<img src="/static/app/alert_manager/painel_gerencial/img/GRAF.png" />`;
                
                
        }
            
        $td.css({ 'background-color': colMapping[cellData.field], 'color': 'black' }).html(conteudo);
    }
});

mainTable.addCellRenderer(new TrocaCor());

var keys = Object.keys(colMapping);

for(var i=0; i < keys.length; i++) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'th[data-sort-key="' + keys[i] + '"] { background-color:' + colMapping[keys[i]] + ' !important;border: 0 !important; border-bottom:2px solid black !important;}';
    document.getElementsByTagName('head')[0].appendChild(style);
} 


var drilldownMapping = {
    "TOT": [],
    "UP": [],
    "DN": [        
        {
            "value": "metric IN (\"link\",\"linkState\",\"status\")"
        }
    ],
    "PAR": [],
    "ERR": [        
        {
            "value": "metric IN (\"HA-STATUS\",\"IN_ERRORS\")"
        }
    ],
    "LAT": [        
        {
            "value": "metric IN (\"latency\")"
        }
    ],
    "PAC": [        
        {
            "value": "metric IN (\"packet_loss_percent\")"
        }
    ],
    "INT": [        
        {
            "value": "NOT metric IN (\"link\",\"linkState\",\"status\",\"HA-STATUS\",\"IN_ERRORS\",\"latency\",\"packet_loss_percent\")"
        }
    ],
    "CHK_OK": [        
        {
            "value": "assigned=*"
        }
    ],
    "CHK_NOK": [        
        {
            "value": "Not assigned=*"
        }
    ],
    "TTS": [        
        {
            "value": "siebel=*"
        }
    ],
    "1D": [        
        {
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[24]
        }
    ],
    "2D": [        
        {
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[48]
        }
    ],
    "3D": [        
        {
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[72]
        }
    ],
    "4D": [        
        {
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[96]
        }
    ],
    "5D": [        
        {
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[120]
        }
    ],
    ">5D": [        
        {
            "value": "Data_Abertura<=",
            "type":"function",
            "function":Epoch,
            "args":[120]
        }
    ],
    "GRAF": [
        {
            "value": "Data_Abertura<=",
            "type":"function",
            "function":Epoch,
            "args":[120]
        }
    ]
}

function tableClick(e, object) {

    e.preventDefault();

    args = ["Empresa=" + e.data["row.Cliente"] + "*"];

    for(var i=0; i<drilldownMapping[e.field].length; i++) {

        if (drilldownMapping[e.field][i]["type"]=='function'){
            args.push(drilldownMapping[e.field][i]["value"] + drilldownMapping[e.field][i]["function"].apply(this, drilldownMapping[e.field][i]["args"]) );
        }
        else{
            args.push(drilldownMapping[e.field][i]["value"]);
        } 
    }

    args = "urlSearch=" + encodeURI(args.join(" ")).replace(/=/g, "%3D");

    window.open(urlMapper(e.field, e, args), '_blank').focus();
}

mainTable.on("click:row", tableClick);

mainTable.render();

});
