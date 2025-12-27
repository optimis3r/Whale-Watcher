const socket = io("http://localhost:3000");

socket.on("TRADE_UPDATE", (trade) => {
  updateChart(trade);
});

socket.on("WHALE_ALERT", (alert) => {
  showAlert(alert);
});

