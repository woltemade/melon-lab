import Wallet from 'ethers-wallet';

const decryptWallet = async (encryptedWallet, password) => {
  const jsonWallet = JSON.stringify(encryptedWallet);
  const decryptedWallet = await Wallet.Wallet.fromEncryptedWallet(
    encryptedWallet,
    password,
  );
  return decryptedWallet;
};

export default decryptWallet;
