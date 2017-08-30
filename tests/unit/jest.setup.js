import setup from "../../lib/utils/setup";
import Web3 from "../mocks/web3";

const web3 = new Web3();

setup.init({ web3, daemonAddress: "0xDAEMON" });
