// @flow
import type { Environment } from '../../utils/environment/Environment';

/**
 * Given a method name, this function returns the method signature of that function (from adapter contract), which then gets passed into callOnExchange function
 */
const getMethodNameSignature = (
  environment: Environment,
  methodName: String,
): Order => {
  let signature;
  switch (methodName) {
    case 'makeOrder':
      signature = environment.api
        .abiSignature('makeOrder', [
          'address',
          'address[5]',
          'uint256[6]',
          'bytes32',
          'uint8',
          'bytes32',
          'bytes32',
        ])
        .slice(0, 10);
      break;

    case 'takeOrder':
      signature = environment.api.util
        .abiSignature('takeOrder', [
          'address',
          'address[5]',
          'uint256[6]',
          'bytes32',
          'uint8',
          'bytes32',
          'bytes32',
        ])
        .slice(0, 10);
      break;

    case 'cancelOrder':
      signature = environment.api.util
        .abiSignature('cancelOrder', [
          'address',
          'address[5]',
          'uint256[6]',
          'bytes32',
          'uint8',
          'bytes32',
          'bytes32',
        ])
        .slice(0, 10);

    default:
      throw new Error(`No match found for method name ${methodName}`);
  }

  return signature;
};

export default getMethodNameSignature;
