// @flow
const requestTypes = {
  0: 'Invest',
  1: 'Redeem',
  2: 'tokenFallbackRedeem',
};

export type RequestType = $Keys<typeof requestTypes>;

export default requestTypes;
