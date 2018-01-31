/* eslint-disable */
const ethUtil = require('./ethereumjsUtil');
const ethAbi = require('./ethereumjsAbi');

module.exports = {
  concatSig(v, r, s) {
    const rSig = ethUtil.fromSigned(r);
    const sSig = ethUtil.fromSigned(s);
    const vSig = ethUtil.bufferToInt(v);
    const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64);
    const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64);
    const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig));
    return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex');
  },

  normalize(input) {
    if (!input) return;

    if (typeof input === 'number') {
      const buffer = ethUtil.toBuffer(input);
      input = ethUtil.bufferToHex(buffer);
    }

    if (typeof input !== 'string') {
      let msg =
        'eth-sig-util.normalize() requires hex string or integer input.';
      msg += ` received ${typeof input}: ${input}`;
      throw new Error(msg);
    }

    return ethUtil.addHexPrefix(input.toLowerCase());
  },

  personalSign(privateKey, msgParams) {
    const message = ethUtil.toBuffer(msgParams.data);
    const msgHash = ethUtil.hashPersonalMessage(message);
    const sig = ethUtil.ecsign(msgHash, privateKey);
    const serialized = ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s));
    return serialized;
  },

  recoverPersonalSignature(msgParams) {
    const publicKey = getPublicKeyFor(msgParams);
    const sender = ethUtil.publicToAddress(publicKey);
    const senderHex = ethUtil.bufferToHex(sender);
    return senderHex;
  },

  extractPublicKey(msgParams) {
    const publicKey = getPublicKeyFor(msgParams);
    return `0x${publicKey.toString('hex')}`;
  },

  typedSignatureHash(typedData) {
    const hashBuffer = typedSignatureHash(typedData);
    return ethUtil.bufferToHex(hashBuffer);
  },

  signTypedData(privateKey, msgParams) {
    const msgHash = typedSignatureHash(msgParams.data);
    const sig = ethUtil.ecsign(msgHash, privateKey);
    return ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s));
  },

  recoverTypedSignature(msgParams) {
    const msgHash = typedSignatureHash(msgParams.data);
    const publicKey = recoverPublicKey(msgHash, msgParams.sig);
    const sender = ethUtil.publicToAddress(publicKey);
    return ethUtil.bufferToHex(sender);
  },
};

/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */
function typedSignatureHash(typedData) {
  const error = new Error('Expect argument to be non-empty array');
  if (typeof typedData !== 'object' || !typedData.length) throw error;

  const data = typedData.map(
    e => (e.type === 'bytes' ? ethUtil.toBuffer(e.value) : e.value),
  );
  const types = typedData.map(e => e.type);
  const schema = typedData.map(e => {
    if (!e.name) throw error;
    return `${e.type} ${e.name}`;
  });

  return ethAbi.soliditySHA3(
    ['bytes32', 'bytes32'],
    [
      ethAbi.soliditySHA3(new Array(typedData.length).fill('string'), schema),
      ethAbi.soliditySHA3(types, data),
    ],
  );
}

function recoverPublicKey(hash, sig) {
  const signature = ethUtil.toBuffer(sig);
  const sigParams = ethUtil.fromRpcSig(signature);
  return ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s);
}

function getPublicKeyFor(msgParams) {
  const message = ethUtil.toBuffer(msgParams.data);
  const msgHash = ethUtil.hashPersonalMessage(message);
  return recoverPublicKey(msgHash, msgParams.sig);
}

function padWithZeroes(number, length) {
  let myString = `${number}`;
  while (myString.length < length) {
    myString = `0${myString}`;
  }
  return myString;
}
