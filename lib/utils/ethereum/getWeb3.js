import Web3 from "web3";
import providers from "../constants/providers";

const checkHttpProvider = url => {
  const provider = new Web3.providers.HttpProvider(url);
  return provider.isConnected() ? provider : null;
};

const getWeb3 = (web3 = global.web3) => {
  let provider;

  if (web3) {
    if (web3.parity) {
      provider = providers.PARITY;
    } else if (web3.currentProvider.isMetaMask) {
      provider = providers.METAMASK;
    } else {
      provider = providers.INJECTED;
    }
    return { web3: new Web3(web3.currentProvider), provider };
  }

  let httpProvider = checkHttpProvider("http://localhost:8545");

  if (httpProvider) {
    provider = providers.LOCAL;
  } else {
    httpProvider = checkHttpProvider("https://kovan.melonport.com");

    if (httpProvider) {
      provider = providers.HOSTED;
    } else {
      provider = providers.NONE;
    }
  }

  return { web3: new Web3(httpProvider), provider };
};

export default getWeb3;
