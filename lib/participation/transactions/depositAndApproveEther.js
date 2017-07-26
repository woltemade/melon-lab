import contract from "truffle-contract";
import EtherTokenJson from "@melonproject/protocol/build/contracts/EtherToken.json";

import { currentProvider } from "../../utils/setup";
import addressList from "../../assets/utils/addressList";

/*
  @param quantity: BigNumber
*/
const depositAndApproveEther = async (
  fromAddress,
  toBeApprovedAddress,
  quantity,
) => {
  const EtherToken = contract(EtherTokenJson);
  EtherToken.setProvider(currentProvider);
  const etherTokenContract = EtherToken.at(addressList.etherToken);
  await etherTokenContract.deposit({ from: fromAddress, value: quantity });
  await etherTokenContract.approve(toBeApprovedAddress, quantity, {
    from: fromAddress,
  });
};

export default depositAndApproveEther;
