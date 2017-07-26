import getTokenInfoBySymbol from "./getTokenInfoBySymbol";

const getDecimalsBySymbol = sym => getTokenInfoBySymbol(sym).decimals;

export default getDecimalsBySymbol;
