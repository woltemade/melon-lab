import api from "@parity/api";

const waitForTransactionReceipt = async (
  contract,
  transactionHash,
  callback,
) => {
  let count = 0,
    callbackFired = false;
  // wait for receipt
  const filter = contract._api._eth.filter("latest", e => {
    console.log("New block", e);
    if (!e && !callbackFired) {
      console.log("Inside if");
      count++;

      // stop watching after 10 blocks (timeout)
      if (count > 10) {
        callbackFired = true;

        if (callback)
          callback(
            new Error("Contract transaction couldn't be found after 50 blocks"),
          );
        else
          throw new Error(
            "Contract transaction couldn't be found after 50 blocks",
          );
      } else {
        contract._api._eth
          .getTransactionReceipt(transactionHash)
          .then(receipt => {
            if (receipt) callback(receipt);
          });
      }
    }
  });
};

export default waitForTransactionReceipt;
