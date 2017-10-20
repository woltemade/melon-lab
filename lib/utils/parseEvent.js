import SolidityEvent from "web3/lib/web3/event";

const parseEvent = (event, abi) => {
  const decoder = new SolidityEvent(null, abi, null);
  return decoder.decode(event).args;
};

export default parseEvent;
