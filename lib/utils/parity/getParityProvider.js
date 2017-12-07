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
    const api = new Api(httpProvider);
    // console.log("API ", api);
  } else {
    // console.log("here");
    httpProvider = checkHttpProvider("https://kovan.melonport.com");
    // console.log(httpProvider);
    if (httpProvider) {
      currentProvider = providers.HOSTED;
    } else {
      currentProvider = providers.NONE;
    }
  }
  return { provider: httpProvider, currentProvider }; // TODO: currentProvider -> providerType
};

export default getParityProvider;
