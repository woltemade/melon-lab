import tokenInfo from "./tokenInfo";

const getTokenInfoByAddress = address =>
  tokenInfo.kovan.find(
    t => t.address.toLowerCase() === address.toLowerCase(),
  ) ||
  (() => {
    throw new Error(`No token found with address ${address}`);
  })();

const getSymbol = address => getTokenInfoByAddress(address).symbol;

export default getSymbol;
