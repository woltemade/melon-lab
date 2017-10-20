require("dotenv").config();

/* eslint-disable import/first */
import Web3 from "web3";
import setup from "../../lib/utils/setup";
/* eslint-enable */

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
try {
  setup.init({
    web3,
    daemonAddress: "0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd",
    defaultAccount: process.env.UNLOCKED_ACCOUNT,
    tracer: ({ timestamp, message, category, data }) => {
      const args = [timestamp.toISOString(), `[${category}]`, message];
      if (category === "ensureFailed") {
        args.push(JSON.stringify(data, null, 4));
      }
      console.log(...args);
    },
  });
} catch (e) {
  console.error(
    "Cannot setup melon.js. Are you running a local ethereum node at http://localhost:8545 ?",
  );
}
