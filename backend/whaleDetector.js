const { addTrade, getRollingValue } = require("./tradeBuffer");

const SINGLE_WHALE_THRESHOLD = 500000;
const ACCUMULATION_THRESHOLD = 2000000;

function processTrade(trade, io) {
  const price = parseFloat(trade.p);
  const qty = parseFloat(trade.q);
  const value = price * qty;

  if (value < 10000) return; // noise filter

  const tradeObj = {
    price,
    qty,
    value,
    time: Date.now()
  };

  addTrade(tradeObj);

  io.emit("TRADE_UPDATE", tradeObj);

  if (value > SINGLE_WHALE_THRESHOLD) {
    io.emit("WHALE_ALERT", {
      type: "BLOCK_TRADE",
      value,
      price,
      qty,
      confidence: "HIGH"
    });
  }

  const rollingValue = getRollingValue();
  if (rollingValue > ACCUMULATION_THRESHOLD) {
    io.emit("WHALE_ALERT", {
      type: "ACCUMULATION",
      rollingValue,
      confidence: "MEDIUM"
    });
  }
}

module.exports = { processTrade };
