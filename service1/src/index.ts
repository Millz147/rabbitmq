import express from "express";
import amqp from "amqplib";
import { publishMessage } from "./lib/rabbit/publisher";
const app = express();
const queue = "test";
const data = {
  item_id: "4546656",
  text: "This is a sample message ",
};

(async () => {
  await publishMessage("testing", data);
})();

app.post("/send", async (req, res) => {});

app.listen("7001", () => {
  console.log("Connect Service 1");
});
