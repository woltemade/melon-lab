import R from 'ramda';
import Web3 from 'web3';
import contract from 'truffle-contract';
import VersionJson from '../contracts/Version.json';
import VaultJson from '../contracts/Vault.json';
// import VaultJson from '@melonproject/protocol/build/contracts/Vault.json';

const provider = new Web3.providers.HttpProvider('https://kovan.melonport.com');
const web3 = new Web3(provider);

const VersionContract = contract(VersionJson);
VersionContract.setProvider(web3.currentProvider);
const VaultContract = contract(VaultJson);
VaultContract.setProvider(web3.currentProvider);

const Vault = {
  async getById(id) {
    const versionInstance = await VersionContract.deployed();
    const vault = await versionInstance.vaults(id);
    const [address, owner, name, symbol, decimals, isActive] = vault;
    const namedVault = { address, owner, name, symbol, decimals, isActive };
    const details = await this.getDetails(address);
    return { ...namedVault, ...details };
  },
  async getLastId() {
    const versionInstance = await VersionContract.deployed();
    return versionInstance.getLastVaultId();
  },
  async getDetails(address) {
    const vaultInstance = await VaultContract.at(address);
    const detailsLookupMap = {
      universeAddress: vaultInstance.getUniverseAddress,
      referenceAsset: vaultInstance.getReferenceAsset,
      calculations: vaultInstance.performCalculations,
      totalSupply: vaultInstance.totalSupply,
    };
    const promises = Object.keys(detailsLookupMap).map(key =>
      detailsLookupMap[key]().then(value => ({ [key]: value })),
    );
    const resolvedCollection = await Promise.all(promises);
    const mergedDetails = R.mergeAll(resolvedCollection);
    const [
      gav,
      managementFee,
      performanceFee,
      unclaimedFees,
      nav,
      sharePrice,
    ] = mergedDetails.calculations;
    const calculations = {
      gav,
      managementFee,
      performanceFee,
      unclaimedFees,
      nav,
      sharePrice,
    };

    return R.omit(['calculations'], {
      ...mergedDetails,
      ...calculations,
    });
  },
};

export { Vault };
