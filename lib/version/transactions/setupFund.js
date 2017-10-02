import contract from "truffle-contract";
import ParticipationJson from "@melonproject/protocol/build/contracts/ParticipationOpen.json";
import RMMakeOrdersJson from "@melonproject/protocol/build/contracts/RMMakeOrders.json";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";
import SphereJson from "@melonproject/protocol/build/contracts/Sphere.json";
import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import getFundInformations from "../../fund/calls/getFundInformations";

const setupFund = async (portfolioName, from = setup.defaultAccount) => {
  const referenceAsset = "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF";
  const participation = ParticipationJson.networks[setup.networkId].address;
  const riskManagement = RMMakeOrdersJson.networks[setup.networkId].address;
  const sphere = SphereJson.networks[setup.networkId].address;
  const managementReward = 0;
  const performanceReward = 0;
  const Version = contract(VersionJson);
  Version.setProvider(setup.currentProvider);
  const versionContract = await Version.deployed();

  const args = [
    portfolioName,
    referenceAsset,
    // portfolioSymbol,
    // portfolioDecimals,
    managementReward,
    performanceReward,
    participation,
    riskManagement,
    sphere,
  ];

  const gasEstimation = await versionContract.setupFund.estimateGas(...args);
  args.push({ from, gas: Math.ceil(gasEstimation * 1.2) });

  // TODO: As soon setupFund returns a boolean if successful, ensure this
  // const preflight = await versionContract.setupFund.call(...args);

  const receipt = await versionContract.setupFund(...args);

  const fundAddedMessage = findEventInLog(
    "FundUpdated",
    receipt,
    "Error during fund creation",
  );
  const logArgs = fundAddedMessage.args;

  const fundAddress = await versionContract.getFund(logArgs.id.toNumber());

  const fundInformations = await getFundInformations(fundAddress);

  return {
    id: logArgs.id.toNumber(),
    address: fundAddress,
    name: fundInformations.name,
    timestamp: fundInformations.creationDate,
  };
};

export default setupFund;
