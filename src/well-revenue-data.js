//import { forEach } from "core-js/core/array";

export function buildDataObject(labels, data, title){

  const formatLabels = (tooltipItem) => {
    if (tooltipItem.value !== 0){
    return '$' + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  const wellRevenueData = {
    type: "horizontalBar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "$",
          data: data,
          backgroundColor: "#DAAA00",
          borderColor: "rgb(188, 133, 32, 0.5)",
          borderWidth: 0
        }
      ]
    },
    options: {
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      tooltips: {
        displayColors: false,
        bodyFontSize: 16,
        bodyFontColor: 'Gold',
        callbacks: {
          label: formatLabels
        }
      },
      responsive: true,
      title: {
        display: true,
        text: title,
        font: {
          weight: 'bold',
          size: 24
        }
      },
      legend: {
        display: false,
        position: "left"
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
            lineWidth: 2
          },
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              if (parseInt(value) >= 1000) {
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format commas in number
              } else {
                return '$' + value;
              }
            }
          }
        }],
        yAxes: [{
          gridLines: {
            display:false,
            drawBorder: false
          },
          ticks: {
            mirror: true,
            fontSize: 16,
            padding: -10,
            zIndex: 10,
          }
        }]
      },
      datalabels: {
        color: "black",
        font: {
          weight: "bold"
        } 
      }
    }
  };
  return wellRevenueData;
}

export function buildChartDatasets(data) {
  return [
    {
      label: "$",
      data: data,
      backgroundColor: "rgb(218, 170, 0, 0.5)",
      borderColor: "rgb(188, 133, 32, 0.5)",
      borderWidth: 0
    }
  ]
}
  
