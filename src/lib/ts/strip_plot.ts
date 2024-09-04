import Chart from 'chart.js/auto';

export default function StripChart(data, chart) {
	const ctx = document.getElementById('myChart').getContext('2d');

	// Species labels based on the logic in the R code
	const speciesLabels = data.map((item,idx) =>
		item.Species == '1' ? `${item.Strain_no} faecalis` : `${item.Strain_no} faecium`
	);

	data =  data.map((item,idx) =>
	{
		item.label = item.Species == '1' ? `${item.Strain_no} faecalis` : `${item.Strain_no} faecium`;
		return item;
	}
	);
	const d = 0.3; 

chart = new Chart(ctx, {
	type: 'scatter', 
	data: {
		labels: speciesLabels,
		datasets: [
			{
				label: 'Mode MICs',
				data: data.map((item, i) => ({ x: item['mode.log.MIC'], y:i+1 - d})), 
				backgroundColor: 'white',
				pointStyle: 'rect',
				pointRadius: 4,
				borderColor:'black',
				borderWidth: 2,

			},
			{
				label: 'Mean MICs',
				data: data.map((item, i) => ({ x: item['E.log.MIC'], y: i + 1-d  })), 
				backgroundColor: 'black',
				pointStyle: 'rect',
				pointRadius: 4.5,
			},
			{
				label: 'Interval Censoring',
				data: data.map((item, i) => ({ x: item['lower.log.MIC.ref'], y: i + 1})),
				pointStyle: 'circle',
				borderColor:'black',
				backgroundColor: 'white',
				borderWidth: 2,
				pointRadius: 3,
			},
			{
				label: 'Reference MICs',
				data: data.map((item, i) => ({ x: item['upper.log.MIC.ref'], y: i + 1  })),
				backgroundColor: 'black',
				pointStyle: 'circle',
				pointRadius: 4,
			},
			{
				label:'sd',
				data: data.map((item, i) => ({
					x: [item['lower.log.MIC'], item['upper.log.MIC']],
					y: i + 1 - d, 
				})),
				backgroundColor: 'black',
				borderWidth: 2,
				barThickness: 2,
				type: 'bar',
				indexAxis: 'y',
			},
			{
				label: 'interval',
				data: data.map((item, i) => ({
					x: [item['lower.log.MIC.ref'], item['upper.log.MIC.ref']],
					y: i + 1 , 
				})),
				backgroundColor: 'blue',
				borderWidth: 2,
				barThickness: 2,
				type: 'bar',
				indexAxis: 'y',
		
			}
		],
	},
	options: {
		maintainAspectRatio:false,
		scales: {
			x: {
				grid:{
					display:false
				},
				title: {
					display: true,
					text: 'MIC',
				},
				// min: 0,
				// max: 9,
				ticks: {
					callback: function (value) {
						return Math.pow(2, value);
					},
				},
	
				
				
			},
			y: {
				reverse:true,
				min:1,
				max:data.length,
				offset:true,
				ticks: {
					padding: 20,
					stepSize:1,
			
				},
				afterTickToLabelConversion: function(scaleInstance) { 
					scaleInstance.ticks.forEach(tick => { 
						const idx = data.findIndex((i)=> i.Strain_no == tick.value);
						if(idx>-1){
							const target = data[idx];
							tick.label = target.Species == '1' ? `${target.Strain_no} faecalis(n=${target.count})` : `${target.Strain_no} faecium(n=${target.count})`;

						}
						return; 
					});
					},
				labels: speciesLabels,
				title: {
					display: true,
					text: 'Strain_no',
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				labels: {
					filter:function(label){
						if(label.text=='sd' || label.text =='interval') return false;
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
						if(context.dataset.label=='interval'){
							return `${context.dataset.label}: ${Math.pow(2,context.raw.x[0])}, ${Math.pow(2,context.raw.x[1])}}`;
						}else if(context.dataset.label == 'sd'){

						}
						else{
							return `${context.dataset.label}: ${Math.pow(2, context.raw.x)}`;
						}
					},
				},
			},
		},
	},
});

}
