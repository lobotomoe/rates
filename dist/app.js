"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("module-alias/register");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: `${__dirname}/../.env` });
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const sequelize_1 = require("sequelize");
const init_models_1 = require("./models/init-models");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_ts_controllers_1 = require("koa-ts-controllers");
const Sentry = __importStar(require("@sentry/node"));
const web3_service_1 = require("./web3_service");
const binance_1 = require("./binance");
require("./socket");
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, SENTRY_DSN, NODE_ENV, BALANCE_UPDATE_PERIOD_MS, } = process.env;
if (SENTRY_DSN && NODE_ENV === "production")
    Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 0.1 });
setInterval(() => {
    init_models_1.Address.findAll().then((res) => {
        res.map((addr) => {
            switch (addr.type) {
                case "eth": {
                    addr.address &&
                        web3_service_1.web3.eth
                            .getBalance(addr.address)
                            .then((balance) => {
                            init_models_1.AddressBalance.create({
                                value: Number(web3_service_1.web3.utils.fromWei(balance, "ether")),
                                addressId: addr.id,
                            });
                        })
                            .catch((err) => console.error(err));
                    break;
                }
                case "orn": {
                    web3_service_1.tokenInst.methods
                        .balanceOf(addr.address)
                        .call()
                        .then((balance) => {
                        init_models_1.AddressBalance.create({
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
binance_1.init_ws();
const sequelize = new sequelize_1.Sequelize({
    host: DB_HOST || "db",
    database: DB_NAME || "postgres",
    username: DB_USER || "postgres",
    password: DB_PASS || "password",
    dialect: "postgres",
});
function init_db() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Checking database connection...`);
        try {
            yield sequelize.authenticate();
            console.log("Database connection OK!");
            init_models_1.initModels(sequelize);
            sequelize.sync();
        }
        catch (error) {
            console.log("Unable to connect to the database:");
            console.log(error.message);
            process.exit(1);
        }
    });
}
const app = new koa_1.default();
function init_web_server() {
    return __awaiter(this, void 0, void 0, function* () {
        const router = new koa_router_1.default();
        yield koa_ts_controllers_1.bootstrapControllers(app, {
            router,
            basePath: "/",
            controllers: [__dirname + "/controllers/*"],
            disableVersioning: true,
        });
        app.use(cors_1.default({ origin: "*" }));
        app.use(koa_bodyparser_1.default());
        app.use(router.routes());
        app.use(router.allowedMethods());
        app.on("error", (err, ctx) => {
            console.error(err);
        });
        app.listen(1337);
        console.log("Koa application is up and running on port 1337");
    });
}
init_db().then(init_web_server);
//# sourceMappingURL=app.js.map