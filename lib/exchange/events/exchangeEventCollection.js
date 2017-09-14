import SolidityEvent from "web3/lib/web3/event";
import ExchangeInterfaceJson from "@melonproject/protocol/build/contracts/ExchangeInterface.json";
import onOrderUpdate from "./onOrderUpdate";

const onEventMap = {
  OrderUpdate: onOrderUpdate,
};

const exchangeEventCollection = ExchangeInterfaceJson.abi
  .filter(i => i.type === "event")
  .map(i => ({
    abi: i,
    decoder: new SolidityEvent(null, i, null),
  }))
  .map(({ abi, decoder }) => ({
    name: abi.name,
    hash: `0x${decoder.signature()}`,
    onEvent: onEventMap[abi.name],
    abi,
  }));

export default exchangeEventCollection;
