// @flow
import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import sendTransaction from "../../utils/parity/sendTransaction";
import getVersionContract from "../contracts/getVersionContract";
import getFundInformations from "../../fund/calls/getFundInformations";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import type { Address } from "../../assets/schemas/Address";

/**
 * Basic fund information
 */
type Fund = {
  id: number,
  address: Address,
  name: string,
  inception: number,
};

/**
 * Setup a new fund with `name`
 */
const setupFund = async (
  name: string,
  v: number,
  r: string,
  s: string,
  from: Address = setup.defaultAccount,
): Promise<Fund> => {
  const referenceAsset = "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF"; // TODO: get address from datafeed contract
  const participation = addressBook.kovan.ParticipationOpen;
  const riskManagement = addressBook.kovan.RMMakeOrders;
  const sphere = addressBook.kovan.Sphere;
  const managementReward = 0;
  const performanceReward = 0;

  const versionContract = await getVersionContract();

  const params = [
    name,
    referenceAsset,
    managementReward,
    performanceReward,
    participation,
    riskManagement,
    sphere,
    v,
    r,
    s,
  ];

  // TODO: As soon setupFund returns a boolean if successful, ensure this
  // const preflight = await versionContract.setupFund.call(...params);
  const receipt = await sendTransaction(versionContract, "setupFund", params);

  const fundAddedMessage = findEventInLog(
    "FundUpdated",
    receipt,
    "Error during fund creation",
  );
  const logArgs = fundAddedMessage.params;

  const fundAddress = await versionContract.instance.getFundById.call({}, [
    logArgs.id.value.toNumber(),
  ]);

  const fundInformations = await getFundInformations(fundAddress);

  return {
    address: fundAddress,
    id: logArgs.id.value.toNumber(),
    name: fundInformations.name,
    inception: fundInformations.inception,
  };
};

export default setupFund;
