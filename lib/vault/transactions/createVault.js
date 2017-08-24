import contract from "truffle-contract";
import ParticipationJson from "@melonproject/protocol/build/contracts/Participation.json";
import RiskMgmtV1Json from "@melonproject/protocol/build/contracts/RiskMgmtV1.json";
import RewardsJson from "@melonproject/protocol/build/contracts/Rewards.json";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";
import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import getConfig from "../../universe/calls/getConfig";

const createVault = async (portfolioName, from = setup.defaultAccount) => {
  const config = await getConfig();

  const portfolioSymbol = "MLN-T";
  const portfolioDecimals = 18;
  const universe = config.universeAddress;
  const participation = ParticipationJson.networks[42].address;
  const riskManagement = RiskMgmtV1Json.networks[42].address;
  const rewards = RewardsJson.networks[42].address;

  const Version = contract(VersionJson);
  Version.setProvider(setup.currentProvider);
  const versionContract = await Version.deployed();

  const args = [
    portfolioName,
    portfolioSymbol,
    portfolioDecimals,
    universe,
    participation,
    riskManagement,
    rewards,
  ];

  const gasEstimation = await versionContract.createVault.estimateGas(...args);
  args.push({ from, gas: 5900000 });
  console.log(versionContract.createVault, gasEstimation);

  const receipt = await versionContract.createVault(...args);
  const vaultAddedMessage = findEventInLog("VaultAdded", receipt);
  if (!vaultAddedMessage) throw new Error("Vault was not created.");
  const vaultId = vaultAddedMessage.args.id;
  const vaultInfo = await versionContract.getVault(vaultId);
  return {
    address: vaultInfo[0],
    owner: vaultInfo[1],
    name: vaultInfo[2],
    symbol: vaultInfo[3],
    decimals: vaultInfo[4].toNumber(),
    active: vaultInfo[5],
    timestamp: vaultInfo[6],
  };
};

export default createVault;
