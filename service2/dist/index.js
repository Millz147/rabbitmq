"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const amqplib_1 = __importDefault(require("amqplib"));
const app = (0, express_1.default)();
const queue = "product_inventory";
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect("amqp://localhost");
        const channel = yield connection.createChannel();
        process.once("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            yield channel.close();
            yield connection.close();
        }));
        yield channel.assertQueue(queue, { durable: false });
        yield channel.consume(queue, (message) => {
            if (message) {
                console.log(" [x] Received '%s'", JSON.parse(message.content.toString()));
            }
        }, { noAck: true });
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
    }
    catch (err) {
        console.warn(err);
    }
}))();
app.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen("7002", () => {
    console.log("Connect Service 2");
});
