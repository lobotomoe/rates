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
const web3_1 = __importDefault(require("web3"));
const init_web3 = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.INFURA_API) {
        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.INFURA_API));
        web3.eth.net
            .isListening()
            .then(() => console.log("Infura connected"))
            .catch((e) => console.log("Infura connection error: " + e));
        // web3.eth.getBalance('')
    }
});
exports.default = init_web3;
//# sourceMappingURL=web3.js.map