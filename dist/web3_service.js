"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenInst = exports.web3 = void 0;
const web3_1 = __importDefault(require("web3"));
const erc20abi_json_1 = __importDefault(require("./erc20abi.json"));
let web3;
exports.web3 = web3;
let tokenInst;
exports.tokenInst = tokenInst;
if (process.env.WEB3_HTTP_PROVIDER_API) {
    exports.web3 = web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_API));
    web3.eth.net
        .isListening()
        .then(() => {
        console.log("Infura connected");
        exports.tokenInst = tokenInst = new web3.eth.Contract(erc20abi_json_1.default, process.env.ORN_CONTRACT);
    })
        .catch((e) => console.log("Infura connection error: " + e));
}
//# sourceMappingURL=web3_service.js.map