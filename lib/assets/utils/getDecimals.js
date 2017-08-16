import getTokenInfo from "./getTokenInfo";

const getDecimals = sym => getTokenInfo(sym).decimals;

export default getDecimals;
