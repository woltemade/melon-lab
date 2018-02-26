import ensure from '../../utils/generic/ensure';

/**
 * Test if subscribe request is permitted
 */
const isInvestmentPermittedAndAllowed = async (
  environment,
  { fundContract },
) => {
  ensure(
    await fundContract.instance.isInvestAllowed.call(),
    'Subscriptions in MLN to fund are disabled by the fund manager',
  );
};

export default isInvestmentPermittedAndAllowed;
