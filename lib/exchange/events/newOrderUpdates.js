import contract from "truffle-contract";
import ExchangeJson from "@melonproject/protocol/build/contracts/Exchange.json";

import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";

const newOrderUpdates = async callback => {
  const Exchange = contract(ExchangeJson);
  Exchange.setProvider(setup.currentProvider);
  const universeConfig = await getConfig();
  const exchangeContract = Exchange.at(universeConfig.exchangeAddress);

  const orders = exchangeContract.OrderUpdate(
    {},
    {
      fromBlock: setup.web3.eth.blockNumber,
      toBlock: "latest",
    },
  );

  orders.watch(callback);
};

export default newOrderUpdates;
