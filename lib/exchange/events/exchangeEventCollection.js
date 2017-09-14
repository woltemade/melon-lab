import SolidityEvent from "web3/lib/web3/event";
import ExchangeProtocolJson from "@melonproject/protocol/build/contracts/ExchangeProtocol.json";

const exchangeEventCollection = ExchangeProtocolJson.abi
  .filter(i => i.type === "event")
  .map(i => ({
    abi: i,
    decoder: new SolidityEvent(null, i, null),
  }))
  .map(({ abi, decoder }) => ({
    name: abi.name,
    hash: `0x${decoder.signature()}`,
    abi,
  }));

export default exchangeEventCollection;
