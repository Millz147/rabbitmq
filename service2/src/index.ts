import express from "express";
import amqp from "amqplib";
import { consumeMessage } from "./lib/rabbit/consumer";
const app = express();

(async () => {
  await consumeMessage("testing");
})();

// app.post("/send", async (req, res) => {});

app.listen("7002", () => {
  console.log("Connect Service 2");
});
