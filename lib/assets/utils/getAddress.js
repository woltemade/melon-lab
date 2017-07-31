import getTokenInfoBySymbol from "./getTokenInfoBySymbol";

const getAddress = sym => getTokenInfoBySymbol(sym).address.toLowerCase();

export default getAddress;
