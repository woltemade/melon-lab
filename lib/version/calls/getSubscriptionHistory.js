import getVersionContract from "../contracts/getVersionContract";

const getSubscriptionHistory = async (managerAddress, startId = 0) => {
  const versionContract = await getVersionContract();

  const subscriptionHistory = await versionContract.getSubscriptionHistory(
    managerAddress,
    startId,
  );

  return subscriptionHistory;
};

export default getSubscriptionHistory;
