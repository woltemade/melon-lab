// @flow
import typeof BigNumber from 'bignumber.js';

const toDate = (value: BigNumber): Date => new Date(value.times(1000));

export default toDate;
