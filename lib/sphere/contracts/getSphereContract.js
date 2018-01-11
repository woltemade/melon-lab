import Api from "@parity/api";

import addressBook from "@melonproject/protocol/addressBook.json";
import setup from "../../utils/setup";
import SphereAbi from "../../../abi/Sphere.json";

/**
 * get deployed instance of sphere contract
 */
const getSphereContract = async () => {
  const api = new Api(setup.provider);
  return api.newContract(SphereAbi, addressBook.kovan.Sphere);
};

export default getSphereContract;
