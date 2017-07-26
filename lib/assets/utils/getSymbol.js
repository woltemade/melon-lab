import getTokenInfoByAddress from "./getTokenInfoByAddress";

const getSymbol = address => getTokenInfoByAddress(address).symbol;

export default getSymbol;
