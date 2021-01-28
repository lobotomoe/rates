"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribe = exports.subscribe = exports.ws = exports.init_ws = void 0;
const ws_1 = __importDefault(require("ws"));
const init_models_1 = require("./models/init-models");
let ws;
exports.ws = ws;
let id = 1;
let trades = new Map();
const subscribe = (from, to) => {
    ws.send(JSON.stringify({
        method: "SUBSCRIBE",
        params: [from + to + "@trade"],
        id,
    }));
};
exports.subscribe = subscribe;
const unsubscribe = (from, to) => {
    ws.send(JSON.stringify({
        method: "UNSUBSCRIBE",
        params: [from + to + "@trade"],
        id,
    }));
};
exports.unsubscribe = unsubscribe;
setInterval(() => {
    trades.forEach((price, symbol) => {
        init_models_1.ExchangeRate.create({ symbol, price });
    });
}, Number(process.env.RATES_UPDATE_PERIOD_MS));
const init_ws = () => {
    id = 1;
    if (process.env.BINANCE_WS) {
        exports.ws = ws = new ws_1.default(process.env.BINANCE_WS);
        ws.on("open", () => {
            let tokens = [];
            if (process.env.TOKENS) {
                tokens = process.env.TOKENS.split(",");
            }
            let currencies = [];
            if (process.env.CURRENCIES) {
                currencies = process.env.CURRENCIES.split(",");
            }
            tokens.map((t) => currencies.map((c) => subscribe(t, c)));
        });
        ws.on("ping", () => ws.pong());
        ws.on("message", (data) => {
            try {
                const obj_data = JSON.parse(data.toString());
                Object.prototype.hasOwnProperty.call(obj_data, "result") &&
                    obj_data.result === null &&
                    id++;
                Object.prototype.hasOwnProperty.call(obj_data, "e") &&
                    trades.set(obj_data.s, obj_data.p);
            }
            catch (e) {
                console.error(e);
            }
        });
        ws.on("close", init_ws);
        ws.on("error", (err) => console.error(err));
    }
};
exports.init_ws = init_ws;
//# sourceMappingURL=binance.js.map