import tokenInfo from "./tokenInfo";

const getTokenInfoBySymbol = sym =>
  tokenInfo.kovan.find(t => t.symbol === sym.toUpperCase()) ||
  (() => {
    throw new Error(`No token found with symbol ${sym}`);
  })();

export default getTokenInfoBySymbol;
