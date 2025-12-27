const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const WebSocket = require("ws");

const { processTrade } = require("./whaledetector");
const { startSimulation } = require("./simulation");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

server.listen(3000, () => {
  console.log("🐋 Whale Watcher backend running on port 3000");
});

const MODE = "LIVE"; // LIVE or SIMULATION

if (MODE === "LIVE") {
  const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
  );

  ws.on("message", (data) => {
    const trade = JSON.parse(data);
    processTrade(trade, io);
  });

  ws.on("open", () => console.log("Connected to Binance stream"));
} else {
  startSimulation(io);
}
