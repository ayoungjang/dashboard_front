import Chart from 'chart.js/auto';

export default function (chartData: Array, chart: any, strainNumbers: string[]) {
	const ctx = document.getElementById('myChart').getContext('2d');
	if (chart) chart.destroy(); //if chart is already existed, destroy
	chartData = chartData.filter((item) => {
		return item.EDL !== undefined && item.K_res !==undefined;
	});

	strainNumbers = chartData.map((item) => item.Strain_no);

	const d = 0.3; 

	
	chart = new Chart(ctx, {
		type: 'scatter',
		data: {
			labels: strainNumbers,
			datasets: [
				{
					label: 'Mean',
					data: chartData.map((item: any,idx:number) => ({
						x: item.Mean,
						y: idx+1
					})),
					backgroundColor: 'black',
					pointStyle: 'rect',
					pointRadius: 4.5,
				},
				{
					label: 'K-res',
					data: chartData.map((item: any,idx:number) => {
			
						return {
						x: item.K_res,
						y: idx+1 +d,
						edl:item.EDL
						
					}
				
				}),
				
					backgroundColor: 'white',
					borderColor:"red",
					borderWidth:1.6,
					pointStyle: 'triangle',
					pointRadius: 4,
					pointBorderColor: function(context) {
						var index = context.dataIndex;
						var value = context.dataset.data[index];
						return value.x == value.edl ? 'green' : 'red'
					},
					type: 'scatter',
				},
				{
					label: 'EDL',
					data: chartData.map((item: any,idx:number) => ({
						x: item.EDL,
						K_res:item.K_res,
						y:idx+1+d
					})),
					backgroundColor: 'white',
					borderWidth:1.6,
					borderColor:'blue',
					pointStyle: 'rectRot',
					pointRadius: 4,
					type: 'scatter',
					pointBorderColor: function(context) {
						var index = context.dataIndex;
						var value = context.dataset.data[index];
						return value.x == value.K_res ? 'green' : 'blue'
					},
				},
				{
					label: 'Min/Max',
					data: chartData.map((item: any,idx:number) => ({
						x: [item.min, item.max],
						y: idx+1-d
					})),
					backgroundColor: 'navy',
					type: 'bar',
					borderWidth: 2,
				barThickness: 2,
					indexAxis: 'y'
				},
				{
					label: 'SD',
					data: chartData.map((item: any,idx:number) => ({
						x: [item.Lower, item.Upper],
						y: idx+1
					})),
					backgroundColor: 'black',
					type: 'bar',
					borderWidth: 2,
				barThickness: 2,
					indexAxis: 'y'
				}
			]
		},
		options: {
			maintainAspectRatio: false,
			scales: {
				x: {
					grid:{
						display:false
					},
					title: {
						display: true,
						text: 'mm zone'
					},
					min: 1,
					ticks: {
						stepSize: 1
					}
				},
				y: {
					reverse:true,
					max:strainNumbers.length,
					min:1,
					ticks: {
						padding: 20,
						stepSize: 1
					},
					// type: 'category',
					labels: strainNumbers,
					title: {
						display: true,
						text: 'Strain_no'
					},
				}
			},
			plugins: {
				legend: {
					display: true,
					labels: {
						filter:function(label){
							if(label.text=='SD') return false;
							else return true;
						},
						usePointStyle: true,
						boxHeight:8
					},
				},
				tooltip: {
					
					callbacks: {
						title: ()=>null,
						label: function (context) {
						
							return `Strain ${Math.floor(context.raw.y)} (${context.dataset.label}) : ${context.raw.x}`;
						}
					}
				}
			}
		}
	});
}
