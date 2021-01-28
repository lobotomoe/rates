import WebSocket from "ws";
import { ExchangeRate } from "./models/init-models";

let ws: WebSocket;
let id = 1;
let trades = new Map();

const subscribe = (from: string, to: string) => {
  ws.send(
    JSON.stringify({
      method: "SUBSCRIBE",
      params: [from + to + "@trade"],
      id,
    })
  );
};

const unsubscribe = (from: string, to: string) => {
  ws.send(
    JSON.stringify({
      method: "UNSUBSCRIBE",
      params: [from + to + "@trade"],
      id,
    })
  );
};

setInterval(() => {
  trades.forEach((price: number, symbol: string) => {
    ExchangeRate.create({ symbol, price });
  });
}, Number(process.env.RATES_UPDATE_PERIOD_MS));

const init_ws = () => {
  id = 1;
  if (process.env.BINANCE_WS) {
    ws = new WebSocket(process.env.BINANCE_WS);
    ws.on("open", () => {
      let tokens: string[] = [];
      if (process.env.TOKENS) {
        tokens = process.env.TOKENS.split(",");
      }

      let currencies: string[] = [];
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
      } catch (e) {
        console.error(e);
      }
    });
    ws.on("close", init_ws);
    ws.on("error", (err) => console.error(err));
  }
};

export { init_ws, ws, subscribe, unsubscribe };
