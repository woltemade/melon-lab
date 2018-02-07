import Utils from 'ethers-utils';
import setup from '../../utils/setup';

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signCompetitionTermsAndConditions = async wallet => {
  // const competitionHash =
  //   '0x1A46B45CC849E26BB3159298C3C218EF300D015ED3E23495E77F0E529CE9F69E';
  // const api = new Api(setup.provider);
  // const CompetitionContract = await api.newContract(
  //   CompetitionAbi,
  //   '0x5652AC06E148b8c8d86c2C040fdBbbF98860ef47',
  // );
  // const competitionHash = await CompetitionContract.instance.TERMS_AND_CONDITIONS.call();
  const arrayifiedHash = [
    26,
    70,
    180,
    92,
    200,
    73,
    226,
    107,
    179,
    21,
    146,
    152,
    195,
    194,
    24,
    239,
    48,
    13,
    1,
    94,
    211,
    226,
    52,
    149,
    231,
    127,
    14,
    82,
    156,
    233,
    246,
    158,
  ];

  const hash = Utils.hexlify(arrayifiedHash);

  const api = new Api(setup.provider);
  const rawSignature = await api.eth.sign(wallet.address, hash);

  const v = parseInt(rawSignature.substring(66 + 64), 16);
  return {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v,
  };
};

export default signCompetitionTermsAndConditions;
