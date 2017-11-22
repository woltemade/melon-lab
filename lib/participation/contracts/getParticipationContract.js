// @flow
import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";

/**
 * Get deployed participation contract instance
 */
const getParticipationContract = async () => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync(
      "node_modules/@melonproject/protocol/out/participation/ParticipationOpen.abi",
    ),
  );
  return api.newContract(abi, addressBook.kovan.Participation);
};

export default getParticipationContract;
