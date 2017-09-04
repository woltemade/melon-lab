import contract from "truffle-contract";
import ParticipationJson from "@melonproject/protocol/build/contracts/Participation.json";
import RiskMgmtJson from "@melonproject/protocol/build/contracts/RiskMgmt.json";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";
import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import getConfig from "../../universe/calls/getConfig";

const setupVault = async (portfolioName, from = setup.defaultAccount) => {
  const config = await getConfig();

  const portfolioSymbol = "MLN-T";
  const portfolioDecimals = 18;
  const sphere = config.sphereAddress;
  const participation = ParticipationJson.networks[42].address;
  const riskManagement = RiskMgmtJson.networks[42].address;

  const Version = contract(VersionJson);
  Version.setProvider(setup.currentProvider);
  const versionContract = await Version.deployed();

  const args = [
    portfolioName,
    portfolioSymbol,
    portfolioDecimals,
    participation,
    riskManagement,
    sphere,
  ];

  const gasEstimation = await versionContract.setupVault.estimateGas(...args);
  args.push({ from, gas: Math.ceil(gasEstimation * 1.5) });

  const receipt = await versionContract.setupVault(...args);
  const vaultAddedMessage = findEventInLog("VaultAdded", receipt);
  const logArgs = vaultAddedMessage.args;

  return {
    id: logArgs.id.toNumber(),
    address: logArgs.address,
    owner: logArgs.sender,
    name: logArgs.name,
    timestamp: new Date(logArgs.atTimestamp.times(1000).toNumber()),
  };
};

export default setupVault;
