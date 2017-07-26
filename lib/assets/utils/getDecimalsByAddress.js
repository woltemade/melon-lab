import getTokenInfoByAddress from "./getTokenInfoByAddress";

const getDecimalsByAddress = address => getTokenInfoByAddress(address).decimals;

export default getDecimalsByAddress;
