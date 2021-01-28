import "module-alias/register";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import "reflect-metadata";
import Koa from "koa";
import { Sequelize } from "sequelize";
import { initModels, Address, AddressBalance } from "./models/init-models";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import Router from "koa-router";
import { bootstrapControllers } from "koa-ts-controllers";
import * as Sentry from "@sentry/node";
import { web3, tokenInst } from "./web3_service";
import { init_ws } from "./binance";
import "./socket";

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  SENTRY_DSN,
  NODE_ENV,
  BALANCE_UPDATE_PERIOD_MS,
} = process.env;

if (SENTRY_DSN && NODE_ENV === "production")
  Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 0.1 });

setInterval(() => {
  Address.findAll().then((res) => {
    res.map((addr) => {
      switch (addr.type) {
        case "eth": {
          addr.address &&
            web3.eth
              .getBalance(addr.address)
              .then((balance) => {
                AddressBalance.create({
                  value: Number(web3.utils.fromWei(balance, "ether")),
                  addressId: addr.id,
                });
              })
              .catch((err) => console.error(err));
          break;
        }

        case "orn": {
          tokenInst.methods
            .balanceOf(addr.address)
            .call()
            .then((balance: number) => {
              AddressBalance.create({
                value: balance,
                addressId: addr.id,
              });
            });
          break;
        }
      }
    });
  });
}, Number(BALANCE_UPDATE_PERIOD_MS));

init_ws();

const sequelize = new Sequelize({
  host: DB_HOST || "db",
  database: DB_NAME || "postgres",
  username: DB_USER || "postgres",
  password: DB_PASS || "postgres",
  dialect: "postgres",
});

async function init_db() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");

    initModels(sequelize);
    sequelize.sync();
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

const app = new Koa();
async function init_web_server() {
  const router = new Router();

  await bootstrapControllers(app, {
    router,
    basePath: "/",
    controllers: [__dirname + "/controllers/*"],
    disableVersioning: true,
  });

  app.use(cors({ origin: "*" }));

  app.use(bodyParser());

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.on("error", (err, ctx) => {
    console.error(err);
  });
  app.listen(1337);
  console.log("Koa application is up and running on port 1337");
}

init_db().then(init_web_server);
