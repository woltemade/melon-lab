import Api from '@parity/api';
import providers from '../constants/providers';

const checkHttpProvider = async (url, connectionTimeout) => {
  try {
    const provider = new Api.Provider.Http(url, connectionTimeout);
    const api = new Api(provider);
    // HACK: Parity does not properly return api.isConnected. This is always true.
    // So we need to explicitly make a call that fails for a unreachable node. :(
    await api.net.version();
    return { api, provider };
  } catch (e) {
    return false;
  }
};

const findHttpProvider = (providerTypeUrlMap, connectionTimeout) =>
  Object.entries(providerTypeUrlMap).reduce(
    async (lastPromise, [type, url]) => {
      const lastType = await lastPromise;

      if (lastType) return lastType;

      const candidate = await checkHttpProvider(url, connectionTimeout);
      return candidate ? { ...candidate, providerType: type } : false;
    },
    new Promise(resolve => resolve(false)),
  );

/**
 * Walks through providerTypUrlMap from top to bottom and returns the first
 * provider that successfully connects.
 *
 * @returns Object {
 *  api: [Parity API instance],
 *  provider: [Parity Provider Instance],
 *  providerType: [f.e. providers.Parity],
 * }
 */
const getParityProvider = async connectionTimeout => {
  const provider =
    global.ethereum && global.ethereum.isParity
      ? {
          provider: global.ethereum,
          api: new Api(global.ethereum),
          providerType: providers.INJECTED,
        }
      : findHttpProvider(
          {
            [providers.LOCAL]: 'http://localhost:8545',
            [providers.HOSTED]: 'https://kovan.melonport.com',
          },
          connectionTimeout,
        );

  return provider || { providerType: providers.NONE };
};

export default getParityProvider;
