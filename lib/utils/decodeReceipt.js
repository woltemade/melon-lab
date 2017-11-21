import ethers from "ethers";

ethers.Contract.prototype.decodeReceiptForEvent = function(receipt, eventName) {
  const eventDescription = this.interface.events[eventName];
  if (eventDescription === undefined)
    throw new Error(
      `Event name ${eventName} not found in contract description.`,
    );

  const eventInfo = eventDescription();

  for (const log of receipt.logs) {
    const decodedDataAndTopics = eventInfo.parse(log.topics, log.data);
    console.log(decodedDataAndTopics);
    if (decodedDataAndTopics)
      return {
        ...receipt,
        args: decodedDataAndTopics,
      };
  }
};
