import contract from "truffle-contract";
import SphereJson from "@melonproject/protocol/build/contracts/Sphere.json";

import setup from "../../utils/setup";

const getSphereContract = async () => {
  const Sphere = contract(SphereJson);
  Sphere.setProvider(setup.currentProvider);
  return Sphere.deployed();
};

export default getSphereContract;
