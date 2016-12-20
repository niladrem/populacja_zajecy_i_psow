var headers = [];
var linedata = [];

function drawChart(){
    dataChart = Highcharts.chart('container',{
        /*chart: {
            type: 'line'
        },*/
		title: {
            text: 'Wizualizacja danych zające i psy' 
        },
		xAxis: {
			categories: headers
		},
/*		plotOptions: {
			line: {
				dataLabels: {
                    enabled: true
                }
            },
		},*/
		tooltip: {
			shared: true,
		    crosshairs: true
        },
        legend: {
            layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
        },
		series: linedata
	});
}

function processData(allText){
    var record_num = 201;
    var allTextLines = allText.split(/\r\n|\n/);
    headers.length = 0;
    linedata.length = 0;
    for(var i = 1; i <= 500; i++){
        headers.push(i);
    }
    for(var i = 0; i < allTextLines.length ; i++){
        var row = allTextLines[i].split(',');
        for(var j = 0; j < record_num; j++){
            if(j == 0){
                var pom = {name: row[0], data: []}
                linedata.push(pom);
            }
            else{
                linedata[i].data.push(parseInt(row[j]));
            }
        }
    }
    console.log(linedata);
    
    drawChart();
}

$(document).ready(function() {
    /*console.log("IDE PO DANE");
    $.ajax({
        type: "GET",
        url: "zajaceipsy.csv",
        dataType: "text",
        success: function(data) {
            console.log("PRZYNIOSLEM DANE");

            processData(data);}
     });*/
     $("#run").click(function(e){
     	console.log("test");
     	var zwierze = $("#zwierze").val();
     	var R = parseFloat($("#R").val());
     	var E = parseFloat($("#E").val());
     	var S = parseFloat($("#S").val());
     	var P = parseInt($("#l_p").val());
     	var Z = parseInt($("#l_z").val());
     	var iter = parseInt($("#iter").val());
     	console.log(zwierze);
     	var x = new Array();
     	var z = new Array();
     	var p = new Array();
     	var dz = new Array();

     	headers.length = 0;
     	linedata.length = 0;
     	headers.push(0);

     	for(var i = 0; i < 200; i++){
     		x[i] = 0.000;
     		z[i] = 0;
     		p[i] = 0;
     		dz[i] = 0;
     	}

     	x[0] = Math.random();
     	z[0] = Math.round(Z * x[0]);
     	for(var i = 1; i < 200; i++){
     		headers.push(i);
     		x[i] = R * x[i - 1] * (1.0 - x[i - 1]);
            z[i] = Math.round(Z * x[i]);
                            
            if(i == iter){
                p[i] = P;
            }
            else{
                p[i] = Math.round(E * dz[i - 1]);
            }
            
            dz[i] = Math.round(S * z[i] * p[i]);
            z[i] -= dz[i];
            z[i] = Math.max(0, z[i]);
            x[i] = parseFloat(z[i]) / parseFloat(Z);
     	}
     	var zajac = {name: "liczba_zajęcy", data: z, visible: (zwierze == "0" || zwierze == "2" ? true : false)};
     	var pies = {name: "liczba_psów", data: p, visible: (zwierze == "1" || zwierze == "2" ? true : false)};
     	linedata.push(zajac);
     	linedata.push(pies);
     	drawChart();
     })
     
});
