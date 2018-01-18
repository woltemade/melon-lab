import Api from '@parity/api';
import setup from './setup';

const getPastEvents = async (
  contract,
  address,
  eventSignature,
  fromBlock,
  toBlock,
  paramName,
) => {
  const api = new Api(setup.provider);

  const hashed = Api.util.sha3(eventSignature);

  const filter = {
    fromBlock,
    toBlock,
    address,
    topics: [hashed],
  };

  const pastEvents = await api._eth.getLogs(filter);

  const allReceipts = await Promise.all(
    pastEvents.map(
      async event =>
        await api._eth.getTransactionReceipt(event.transactionHash),
    ),
  );

  return allReceipts.map(receipt => {
    const decodedLogs = contract.parseEventLogs(receipt.logs);
    return `${decodedLogs[0].event} ; ${decodedLogs[0].params.paramName.value}`;
  });
};

export default getPastEvents;

// just decode data
