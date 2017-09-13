import ExchangeProtocolJson from "@melonproject/protocol/build/contracts/ExchangeProtocol.json";

// Maybe useful: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

const exchangeEventMap = ExchangeProtocolJson.abi
  .filter(i => i.type === "event")
  .map(i => ({
    name: i.name,
  }));

export default exchangeEventMap;
