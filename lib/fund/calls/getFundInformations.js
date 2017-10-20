import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

/*
  @pre: vault address retrieved from getFundForManager function.
  @returns: object with all basic relevant information on said vault.
*/

const getFundInformations = async fundAddress => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const name = await fundContract.getName();
  const decimals = await fundContract.getDecimals();
  const creationDate = await fundContract.getCreationTime();

  return {
    fundAddress,
    name,
    decimals,
    creationDate: new Date(creationDate.times(1000).toNumber()),
  };
};

export default getFundInformations;
