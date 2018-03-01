// @flow
const requestStatus = {
  0: 'Active',
  1: 'Cancelled',
  2: 'Executed',
};

export type RequestStatus = $Keys<typeof requestStatus>;

export default requestStatus;
