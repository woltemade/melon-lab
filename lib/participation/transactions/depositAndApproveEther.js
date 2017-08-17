import contract from "truffle-contract";
import EtherTokenJson from "@melonproject/protocol/build/contracts/EtherToken.json";

import setup from "../../utils/setup";
import getAddress from "../../assets/utils/getAddress";
import toProcessable from "../../assets/utils/toProcessable";

/*
  @param quantity: BigNumber
*/
const depositAndApproveEther = async (
  fromAddress,
  toBeApprovedAddress,
  quantity,
) => {
  const processableQuantity = toProcessable(quantity);
  const EtherToken = contract(EtherTokenJson);
  EtherToken.setProvider(setup.currentProvider);
  const etherTokenContract = EtherToken.at(getAddress("ETH-T"));
  await etherTokenContract.deposit({
    from: fromAddress,
    value: processableQuantity,
  });
  await etherTokenContract.approve(toBeApprovedAddress, processableQuantity, {
    from: fromAddress,
  });
};

export default depositAndApproveEther;
