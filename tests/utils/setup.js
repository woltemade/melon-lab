import Web3 from "web3";

import setup from "../../lib/utils/setup";

// Note: It is not necessary to have a JSON-RPC endpoint running locally to
// pass this test.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

setup.init({ web3, daemonAddress: "0xDAEMON" });
