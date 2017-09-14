import Web3 from "web3";
import ExchangeProtocolJson from "@melonproject/protocol/build/contracts/ExchangeProtocol.json";

const web3 = new Web3();
// Maybe useful: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

const exchangeEventCollection = ExchangeProtocolJson.abi
  .filter(i => i.type === "event")
  .map(i => ({
    name: i.name,
    signature: `${i.name}(${i.inputs.map(input => input.type).join(",")})`,
    topic: web3.sha3(
      `${i.name}(${i.inputs.map(input => input.type).join(",")})`,
    ),
    abi: i,
  }));

export default exchangeEventCollection;
