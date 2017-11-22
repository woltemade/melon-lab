import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";

/**
 * get deployed instance of sphere contract
 */
const getSphereContract = async () => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync("node_modules/@melonproject/protocol/out/Sphere.abi"),
  );
  return api.newContract(abi, addressBook.kovan.Sphere);
};

export default getSphereContract;
