import contract from "truffle-contract";
import ParticipationJson from "@melonproject/protocol/build/contracts/ParticipationOpen.json";
import RMMakeOrdersJson from "@melonproject/protocol/build/contracts/RMMakeOrders.json";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";
import SphereJson from "@melonproject/protocol/build/contracts/Sphere.json";
// import list from "../../participation/transactions/list";
import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";

const setupFund = async (portfolioName, from = setup.defaultAccount) => {
  const portfolioSymbol = "MLN-T";
  const portfolioDecimals = 18;
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
    portfolioSymbol,
    portfolioDecimals,
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
    "FundAdded",
    receipt,
    "Error during fund creation",
  );
  const logArgs = fundAddedMessage.args;

  // We'll have to bring it back later
  // await list(from);

  return {
    id: logArgs.id.toNumber(),
    address: logArgs.fundAddr,
    name: logArgs.name,
    timestamp: new Date(logArgs.atTime.times(1000).toNumber()),
  };
};

export default setupFund;
