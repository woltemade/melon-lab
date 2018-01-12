// @flow
import Utils from "ethers-utils";
import addressBook from "@melonproject/protocol/addressBook.json";
import ensure from "../../utils/generic/ensure";
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
  wallet,
  name: string,
  signature: Object,
): Promise<Fund> => {
  const referenceAsset = "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF"; // TODO: get address from datafeed contract
  const compliance = addressBook.kovan.NoCompliance;
  const riskManagement = addressBook.kovan.RMMakeOrders;
  const pricefeed = addressBook.kovan.PriceFeed;
  const simpleMarket = addressBook.kovan.SimpleMarket;
  const simpleAdapter = addressBook.kovan.simpleAdapter;
  const managementReward = 0;
  const performanceReward = 0;

  const versionContract = await getVersionContract();

  const isVersionShutDown = await versionContract.instance.isShutDown.call();

  ensure(!isVersionShutDown, "Version is shut down.");

  const termsAndConditionsAreSigned = await versionContract.instance.termsAndConditionsAreSigned.call(
    { from: wallet.address },
    [signature.v, signature.r, signature.s],
  );
  ensure(
    termsAndConditionsAreSigned,
    "Invalid signature of terms and conditions on contract level",
  );

  const nameHash = Utils.solidityKeccak256(["string"], [name]);

  const nameToOwner = await versionContract.instance.fundNamesToOwners.call(
    {},
    [nameHash],
  );

  ensure(
    nameToOwner === "0x0000000000000000000000000000000000000000" ||
      nameToOwner.toLowerCase() === wallet.address.toLowerCase(),
    "Name owned by another user.",
  );
  const managerToFunds = await versionContract.instance.managerToFunds.call(
    {},
    [wallet.address],
  );
  ensure(
    managerToFunds === "0x0000000000000000000000000000000000000000",
    "Already have a fund",
  );

  const params = [
    name,
    referenceAsset,
    managementReward,
    performanceReward,
    compliance,
    riskManagement,
    pricefeed,
    [simpleMarket],
    [simpleAdapter],
    signature.v,
    signature.r,
    signature.s,
  ];

  const receipt = await sendTransaction(
    versionContract,
    "setupFund",
    params,
    wallet,
  );

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
