import contract from "truffle-contract";
import EtherTokenJson from "@melonproject/protocol/build/contracts/EtherToken.json";

import setup from "../../utils/setup";
import getAddress from "../../assets/utils/getAddress";

/*
  @param quantity: BigNumber
*/
const depositAndApproveEther = async (
  fromAddress,
  toBeApprovedAddress,
  quantity,
) => {
  const EtherToken = contract(EtherTokenJson);
  EtherToken.setProvider(setup.currentProvider);
  const etherTokenContract = EtherToken.at(getAddress("ETH-T"));
  await etherTokenContract.deposit({ from: fromAddress, value: quantity });
  await etherTokenContract.approve(toBeApprovedAddress, quantity, {
    from: fromAddress,
  });
};

export default depositAndApproveEther;
