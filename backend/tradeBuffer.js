let trades = [];

function addTrade(trade) {
  trades.push(trade);

  const cutoff = Date.now() - 5 * 60 * 1000;
  trades = trades.filter(t => t.time > cutoff);
}

function getRollingValue() {
  return trades.reduce((sum, t) => sum + t.value, 0);
}

module.exports = { addTrade, getRollingValue };
