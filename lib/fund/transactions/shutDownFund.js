// @flow
import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";

const shutDownFund = async (
  fundAddress: string,
  from: string = setup.web3.eth.defaultAccount,
) => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const receipt = await gasBoost(fundContract.shutDown, [], {
    from,
  });

  return receipt;
};

export default shutDownFund;
