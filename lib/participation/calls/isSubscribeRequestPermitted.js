import setup from "../../utils/setup";
import getParticipationContract from "../contracts/getParticipationContract";

const isSubscribeRequestPermitted = async ({
  numShares,
  offeredValue,
  subscriber = setup.defaultAccount,
}) => {
  const particpationContract = await getParticipationContract();
  return particpationContract.isSubscribeRequestPermitted(
    subscriber,
    numShares,
    offeredValue,
  );
};

export default isSubscribeRequestPermitted;
