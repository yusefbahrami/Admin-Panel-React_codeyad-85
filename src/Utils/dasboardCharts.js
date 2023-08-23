import Chart from "chart.js/auto";
export const setDashboardChart = (labels, datapoints) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "فروش ماه",
        data: datapoints,
        borderColor: "#0062ff",
        fill: true,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "نمودار فروش یک سال گذشته",
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            // text: 'زمان'
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: " میلیون تومان",
          },
          // suggestedMin: -10,
          // suggestedMax: 200
        },
      },
    },
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  //   new Chart(ctx, config);
  //   console.log(Chart.getChart("myChart"));

  //   code from: https://stackoverflow.com/questions/72193719/chart-js-error-in-angular-canvas-is-already-in-use-chart-with-id-0-must-be-d
  var chartExist = Chart.getChart("myChart");
  //   console.log(chartExist);
  if (chartExist != undefined) {
    chartExist.destroy();
  }
  new Chart(ctx, config);
};
