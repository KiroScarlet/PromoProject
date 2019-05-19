
/**
 * 点击tab查看不同的chart
 */
//nav-tab_1
$('#nav_tab_1 li').click(function(){
	var _title=$(this).find('a').text();
	if($('#nav_tab_1 li').eq(0).hasClass('active')){
		if(_title.indexOf('过去七日')>-1){
			$('#portlet_tab1').removeClass('active');
			$('#portlet_tab2').addClass('active');
			//generate last week's chart
			$.ajax({
				type:"GET",
				url:"/dashboard/getweekeventdata",
				dataType:'json',
				success:function(data){
					chartData=data;
					drawLineChart(chartData,'day','日期','eventCount','事件数量','<b>Date:','chartdiv2','#8e44ad');
				},
		        error:function(data){
		            $(".portlet.box.purple .portlet-body").text("Last week's event data not found!");
		        }
			});
		}
	}
	else{
		if(_title.indexOf('昨日')>-1){
			$('#portlet_tab1').addClass('active');
			$('#portlet_tab2').removeClass('active');
			//generate yesterday's chart
			$.ajax({
				type:"GET",
				url:"/dashboard/getyestardayeventdata",
				dataType:'json',
				success:function(data){
					chartData=data;
					drawLineChart(chartData,'timeHourClock','时刻','eventCount','事件数量','<b>Hour:','chartdiv1','#8e44ad');
				},
		        error:function(data){
		            $(".portlet.box.purple .portlet-body").text("Yestarday's event data not found!");
		        }
			});
		}
	}
});

//nav-tab_2
$('#nav_tab_2 li').click(function(){
	var _title=$(this).find('a').text();
	if($('#nav_tab_2 li').eq(0).hasClass('active')){
		if(_title.indexOf('过去七日')>-1){
			$('#portlet_tab3').removeClass('active');
			$('#portlet_tab4').addClass('active');
			$('#chartdiv4').empty();
			//generate last week's chart
			$.ajax({
				type:"GET",
				url:"/dashboard/getweekeventlocation",
				dataType:'json',
				success:function(data){
					for(var i in data){
						data[i]['color']=getRandomColor();
					}
					chartData=data;
					drawColumnChart(chartData,'districtName','区域','count','事件数量','chartdiv4','#1bbc9b');
				},
		        error:function(data){
		            $(".portlet.box.green-meadow .portlet-body").text("Last week's district event data not found!");
		        }
			});
		}
	}
	else{
		if(_title.indexOf('昨日')>-1){
			$('#portlet_tab3').addClass('active');
			$('#portlet_tab4').removeClass('active');
			$('#chartdiv3').empty();
			//generate yesterday's chart
			$.ajax({
				type:"GET",
				url:"/dashboard/getyestardayeventlocation",
				dataType:'json',
				success:function(data){
					for(var i in data){
						data[i]['color']=getRandomColor();//'#1bbc9b';
					}
					chartData=data;
					
					drawColumnChart(chartData,'districtName','区域','count','事件数量','chartdiv3','#1bbc9b');
				},
		        error:function(data){
		            $(".portlet.box.green-meadow .portlet-body").text("Yestarday's district event data not found!");
		        }
			});
		}
	}
});

//生成随机颜色
function getRandomColor(){    
	var colorArray=['#2C3E50','#578EBE','#1BBC9B','#44B6AE','#E35B5A','#F4D03F','#9B59B6','#8775A7','#BFBFBF'];
	return colorArray[Math.floor(Math.random()*9)];
}

//var getRandomColor = function(){    
//return  '#' +    
//  (function(color){    
//  return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
//    && (color.length == 6) ?  color : arguments.callee(color);    
//})('');    
//} ;

/**
 * 画图表
 */
//画折线图
function drawLineChart(chartData,categoryField,categoryAxis_title,valueField,valueAxis_title,balloonText,chartdiv,color){
	var chart;
    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = categoryField;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.parseDates = false; // as our data is date-based, we set parseDates to true
//      categoryAxis.minPeriod = "HH"; // our data is daily, so we set minPeriod to DD
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.minorGridAlpha = 0.1;
    categoryAxis.axisAlpha = 0;
    categoryAxis.minorGridEnabled = true;
    categoryAxis.inside = false;
    categoryAxis.title=categoryAxis_title;
    categoryAxis.tickLength =2;
    categoryAxis.axisAlpha = 0.6;
    
    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.title=valueAxis_title;
    valueAxis.tickLength =2;
    valueAxis.axisAlpha = 0.6;
    valueAxis.showFirstLabel = true;
    valueAxis.showLastLabel = true;
    valueAxis.inside=false;
    chart.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.solidLength = 3;
    graph.lineColor = color;
    graph.valueField = valueField;
    graph.type='line';
    graph.bullet = "bubble";
    graph.balloonText = balloonText+"[[category]]<br><span style='font-size:14px;'>value:[[value]]</span></b>";
    chart.addGraph(graph);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0.5;
    chartCursor.valueLineEnabled = true;
    chartCursor.valueLineBalloonEnabled = true;
    chart.addChartCursor(chartCursor);

    // WRITE
    chart.write(chartdiv);
}

//画柱状图
function drawColumnChart(chartData,categoryField,categoryAxis_title,valueField,valueAxis_title,chartdiv,color){
	var chart = new AmCharts.AmSerialChart();
                chart.dataProvider = chartData;
                chart.categoryField = categoryField;
                // the following two lines makes chart 3D
//              chart.depth3D = 20;
//              chart.angle = 30;

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.labelRotation = 0;
                categoryAxis.dashLength = 5;
                categoryAxis.gridPosition = "start";
                categoryAxis.title=categoryAxis_title;

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.title = valueAxis_title;
                valueAxis.dashLength = 5;
                chart.addValueAxis(valueAxis);

                // GRAPH
                var graph = new AmCharts.AmGraph();
                graph.valueField = valueField;
                graph.colorField = "color";
                graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 0.8;
                chart.addGraph(graph);

                // CURSOR
                var chartCursor = new AmCharts.ChartCursor();
                chartCursor.cursorAlpha = 0.5;
                chartCursor.zoomable = true;
                chartCursor.categoryBalloonEnabled = true;
                chartCursor.valueLineEnabled = true;
    			chartCursor.valueLineBalloonEnabled = true;
                chart.addChartCursor(chartCursor);

                chart.creditsPosition = "top-right";

                // WRITE
                chart.write(chartdiv);
}
