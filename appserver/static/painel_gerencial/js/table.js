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
        drilldown: "cell",
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

function Epoch(horas)
{
    return (Date.now()/1000)-(horas*60*60);
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

var keys = Object.keys(colMapping);

for(var i=0; i < keys.length; i++) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'th[data-sort-key="' + keys[i] + '"] { background-color:' + colMapping[keys[i]] + ' !important;border: 0 !important; border-bottom:2px solid black !important;}';
    document.getElementsByTagName('head')[0].appendChild(style);
} 

var d_1 = Epoch(24);
console.log(d_1); 
var d_2 = Epoch(48);
console.log(d_2); 
var d_3 = Epoch(72);
console.log(d_3); 
var d_4 = Epoch(96);
console.log(d_4); 
var d_5 = Epoch(120);
console.log(d_5); 

//console.log(d_1); 

drilldownMapping = {
    "TOT": [],
    "UP": [],
    "DN": [        
        {
            "name": "metrica",
            "value": "link"
        },
        {
            "name": "metrica",
            "value": "linkState"
        },
        {
            "name": "metrica",
            "value": "status"
        }
    ],
    "PAR": [
        
        {
            "name": "metrica",
            "value": "(sem definicao ainda)"
        }
    ],
    "ERR": [        
        {
            "name": "metrica",
            "value": "HA-STATUS"
        },
        {
            "name": "metrica",
            "value": "IN_ERRORS"
        }
    ],
    "LAT": [        
        {
            "name": "metrica",
            "value": "latency"
        }
    ],
    "PAC": [        
        {
            "name": "metrica",
            "value": "packet_loss_percent"
        }
    ],
    "INT": [        
        {
            "name": "metrica",
            "value": "not in ('link','linkState','status','HA-STATUS,'IN_ERRORS','latency','packet_loss_percent')"
        }
    ],
    "CHK_OK": [        
        {
            "name": "metrica",
            "value": "Assigned=*"
        }
    ],
    "CHK_NOK": [        
        {
            "name": "metrica",
            "value": "not Assigned=*"
        }
    ],
    "TTS": [        
        {
            "name": "metrica",
            "value": "siebel=*"
        }
    ],
    "1D": [        
        {
            "name": "metrica",
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[24]
        }
    ],
    "2D": [        
        {
            "name": "metrica",
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[48]
        }
    ],
    "3D": [        
        {
            "name": "metrica",
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[72]
        }
    ],
    "4D": [        
        {
            "name": "metrica",
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[96]
        }
    ],
    "5D": [        
        {
            "name": "metrica",
            "value": "Data_Abertura>=",
            "type":"function",
            "function":Epoch,
            "args":[120]
        }
    ],
    ">5D": [        
        {
            "name": "metrica",
            "value": "Data_Abertura<=",
            "type":"function",
            "function":Epoch,
            "args":[120]
        }
    ],
}

function tableClick(e, object) {

    e.preventDefault();

    args = ["Cliente=" + e.data["row.Cliente"]];

    for(var i=0; i<drilldownMapping[e.field].length; i++) {

        if (drilldownMapping[e.field][i]["type"]=='function'){

            args.push(drilldownMapping[e.field][i]["name"] + "=" + drilldownMapping[e.field][i]["value"] + drilldownMapping[e.field][i]["function"].apply(this, drilldownMapping[e.field][i]["args"]) );
        }
        else
        {
            args.push(drilldownMapping[e.field][i]["name"] + "=" + drilldownMapping[e.field][i]["value"]);
        }
        
        
    }

    args = args.join("&");

    console.log(args);
}

mainTable.on("click:row", tableClick);

mainTable.render();

});
