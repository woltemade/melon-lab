import ethers from 'ethers-wallet';

const getWallet = privateKey => new ethers.Wallet(privateKey);

export default getWallet;
