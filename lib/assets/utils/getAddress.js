import getTokenInfo from "./getTokenInfo";

const getAddress = sym => getTokenInfo(sym).address.toLowerCase();

export default getAddress;
