function startSimulation(io) {
  setInterval(() => {
    const price = 42000 + Math.random() * 500;
    const qty = Math.random() * 15;

    const value = price * qty;

    io.emit("TRADE_UPDATE", {
      price,
      qty,
      value,
      time: Date.now(),
      simulated: true
    });

    if (value > 500000) {
      io.emit("WHALE_ALERT", {
        type: "SIMULATED_WHALE",
        value,
        confidence: "HIGH"
      });
    }
  }, 2000);
}

module.exports = { startSimulation };
