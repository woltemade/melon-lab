import ParticipationJson from "@melonproject/protocol/build/contracts/ParticipationOpen.json";
import RMMakeOrdersJson from "@melonproject/protocol/build/contracts/RMMakeOrders.json";
import SphereJson from "@melonproject/protocol/build/contracts/Sphere.json";
import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";
import findEventInLog from "../../utils/findEventInLog";
import getFundInformations from "../../fund/calls/getFundInformations";
import getVersionContract from "../contracts/getVersionContract";

const setupFund = async (portfolioName, from = setup.defaultAccount) => {
  const referenceAsset = "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF"; // TODO: get address from datafeed contract
  const participation = ParticipationJson.networks[setup.networkId].address;
  const riskManagement = RMMakeOrdersJson.networks[setup.networkId].address;
  const sphere = SphereJson.networks[setup.networkId].address;
  const managementReward = 0;
  const performanceReward = 0;

  const versionContract = await getVersionContract();

  const params = [
    portfolioName,
    referenceAsset,
    managementReward,
    performanceReward,
    participation,
    riskManagement,
    sphere,
  ];

  // TODO: As soon setupFund returns a boolean if successful, ensure this
  // const preflight = await versionContract.setupFund.call(...params);

  const receipt = await gasBoost(versionContract.setupFund, params, { from });

  const fundAddedMessage = findEventInLog(
    "FundUpdated",
    receipt,
    "Error during fund creation",
  );
  const logArgs = fundAddedMessage.args;

  const fundAddress = await versionContract.getFundById(logArgs.id.toNumber());

  const fundInformations = await getFundInformations(fundAddress);

  return {
    id: logArgs.id.toNumber(),
    address: fundAddress,
    name: fundInformations.name,
    timestamp: fundInformations.creationDate,
  };
};

export default setupFund;
