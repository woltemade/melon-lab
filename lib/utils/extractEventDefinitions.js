import { path } from "ramda";
import SolidityEvent from "web3/lib/web3/event";

import setup from "./setup";

const extractEventDefinitions = (json, onEventMap = {}) =>
  json.abi
    .filter(i => i.type === "event")
    .map(i => ({
      abi: i,
      decoder: new SolidityEvent(null, i, null),
    }))
    .map(({ abi, decoder }) => ({
      name: abi.name,
      address: path(["networks", setup.networkId, "address"], json),
      hash: `0x${decoder.signature()}`,
      onEvent: onEventMap[abi.name],
      abi,
    }));

export default extractEventDefinitions;
