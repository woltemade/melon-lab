import api from "@parity/api";

const constructTransactionObject = (contract, method, parameters, options) => {
  const functionABI = contract.abi._interface.find(e => e._name === method);

  const encodeOptions = contract._encodeOptions(
    functionABI,
    options,
    parameters,
  );
  console.log(encodeOptions);
  return encodeOptions;
};

export default constructTransactionObject;
