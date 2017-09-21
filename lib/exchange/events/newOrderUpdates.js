import getExchangeAdapterContract from "../contracts/getExchangeAdapterContract";
import setup from "../../utils/setup";

const newOrderUpdates = async callback => {
  const exchangeAdapterContract = await getExchangeAdapterContract();

  const offers = exchangeAdapterContract.OrderUpdate(
    {},
    {
      fromBlock: setup.web3.eth.blockNumber,
      toBlock: "latest",
    },
  );

  offers.watch(callback);
};

export default newOrderUpdates;
