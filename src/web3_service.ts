import Web3 from "web3";
import erc20abi from "./erc20abi.json";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";

let web3: Web3;
let tokenInst: Contract;

if (process.env.WEB3_HTTP_PROVIDER_API) {
  web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_API)
  );

  web3.eth.net
    .isListening()
    .then(() => {
      console.log("Infura connected");
      tokenInst = new web3.eth.Contract(
        erc20abi as AbiItem[],
        process.env.ORN_CONTRACT
      );
    })
    .catch((e) => console.log("Infura connection error: " + e));
}

export { web3, tokenInst };
