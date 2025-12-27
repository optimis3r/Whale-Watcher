const ctx = document.getElementById("tradeChart");

const tradeChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "BTC Price",
      data: [],
      borderColor: "cyan",
      tension: 0.2
    }]
  }
});

function updateChart(trade) {
  const time = new Date(trade.time).toLocaleTimeString();

  tradeChart.data.labels.push(time);
  tradeChart.data.datasets[0].data.push(trade.price);

  if (tradeChart.data.labels.length > 60) {
    tradeChart.data.labels.shift();
    tradeChart.data.datasets[0].data.shift();
  }

  tradeChart.update();
}
