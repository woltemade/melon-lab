import Api from "@parity/api";
import providers from "../constants/providers";

const checkHttpProvider = url => {
  const provider = new Api.Provider.Http(url);
  return provider._connected ? provider : null;
};

const getParityProvider = async () => {
  let httpProvider = checkHttpProvider("http://localhost:8545");
  let currentProvider;

  if (httpProvider) {
    currentProvider = providers.LOCAL;
  } else {
    httpProvider = checkHttpProvider("https://kovan.melonport.com");

    if (httpProvider) {
      currentProvider = providers.HOSTED;
    } else {
      currentProvider = providers.NONE;
    }
  }
  return { provider: httpProvider, currentProvider };
};

export default getParityProvider;
