import Web3 from 'web3';
import contract from 'truffle-contract';
import VersionJson from '@melonproject/protocol/build/contracts/Version.json';
// import VaultJson from '@melonproject/protocol/build/contracts/Vault.json';

const provider = new Web3.providers.HttpProvider('https://kovan.melonport.com');
const web3 = new Web3(provider);

const VersionContract = contract(VersionJson);
// const VaultContract = contract(VaultJson);

const Vault = {
  async getById(id) {
    VersionContract.setProvider(web3.currentProvider);
    const versionInstance = await VersionContract.deployed();
    const vault = await versionInstance.vaults(id);
    const [address, owner, name, symbol, decimals, isActive] = vault;
    return { address, owner, name, symbol, decimals, isActive };
  },
};

export { Vault };
