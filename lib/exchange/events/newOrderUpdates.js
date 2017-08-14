import getExchangeContract from "../contracts/getExchangeContract";
import setup from "../../utils/setup";

const newOrderUpdates = async callback => {
  const exchangeContract = await getExchangeContract();

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
