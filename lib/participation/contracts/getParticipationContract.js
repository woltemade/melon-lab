// @flow
import Api from "@parity/api";

import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import ParticipationInterfaceAbi from "../../../abi/ParticipationInterface.json";

/**
 * Get deployed participation contract instance
 */
const getParticipationContract = async fundContract => {
  const api = new Api(setup.provider);

  const [
    ,
    ,
    participationContractAddress,
  ] = await fundContract.instance.module.call();

  return api.newContract(
    ParticipationInterfaceAbi,
    participationContractAddress,
  );
};

export default getParticipationContract;
