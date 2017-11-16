import Web3 from "web3";
import providers from "../reducers/ethereum";

const checkHttpProvider = url => {
  const provider = new Web3.providers.HttpProvider(url);
  return provider.isConnected ? provider : null;
};

const getWeb3 = (web3 = window.web3) => {
  let providerType;

  if (web3) {
    if (web3.parity) {
      providerType = providers.PARITY;
    } else if (web3.currentProvider.isMetaMask) {
      providerType = providers.METAMASK;
    } else {
      providerType = providers.INJECTED;
    }
    return { web3: new Web3(web3.currentProvider), providerType };
  }

  let provider = checkHttpProvider("http://localhost:8545");

  if (provider) {
    providerType = providers.LOCAL;
  } else {
    provider = checkHttpProvider("https://kovan.melonport.com");

    if (provider) {
      providerType = providers.HOSTED;
    } else {
      providerType = providers.NONE;
    }
  }

  return { web3: new Web3(provider), provider: providerType };
};

export default getWeb3;
