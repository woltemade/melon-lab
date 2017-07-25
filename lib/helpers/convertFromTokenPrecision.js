const convertFromTokenPrecision = (value, precision, targetPrecision = 4) =>
  (value / 10 ** precision).toFixed(targetPrecision);

export default convertFromTokenPrecision;
