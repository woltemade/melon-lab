import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
// import getConfig from "../../version/calls/getConfig";
// TODO: bring back getConfig

import setup from "../../utils/setup";

/**
 * Gets contract instance of deployed DataFeed
 */
const getDataFeedContract = async () => {
  const api = new Api(setup.provider);
  const abi = [
    {
      constant: true,
      inputs: [],
      name: "lastUpdateTimestamp",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getInvertedPrice",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getLastUpdateId",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "remove",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "ofAssets",
          type: "address[]",
        },
        {
          name: "newPrices",
          type: "uint256[]",
        },
      ],
      name: "update",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "sellAsset",
          type: "address",
        },
        {
          name: "buyAsset",
          type: "address",
        },
      ],
      name: "existsData",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getData",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getValidity",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "VALIDITY",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getPrice",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "nextUpdateId",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getDescriptiveInformation",
      outputs: [
        {
          name: "",
          type: "string",
        },
        {
          name: "",
          type: "string",
        },
        {
          name: "",
          type: "string",
        },
        {
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getName",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "sellQuantity",
          type: "uint256",
        },
        {
          name: "buyQuantity",
          type: "uint256",
        },
      ],
      name: "getOrderPrice",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getSpecificInformation",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "bytes32",
        },
        {
          name: "",
          type: "address",
        },
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "address",
        },
      ],
      name: "dataHistory",
      outputs: [
        {
          name: "timestamp",
          type: "uint256",
        },
        {
          name: "price",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "INTERVAL",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "isValid",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getTimestamp",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getInterval",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      name: "registeredAssets",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address",
        },
      ],
      name: "information",
      outputs: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "decimal",
          type: "uint256",
        },
        {
          name: "url",
          type: "string",
        },
        {
          name: "ipfsHash",
          type: "bytes32",
        },
        {
          name: "chainId",
          type: "bytes32",
        },
        {
          name: "breakIn",
          type: "address",
        },
        {
          name: "breakOut",
          type: "address",
        },
        {
          name: "exists",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofBase",
          type: "address",
        },
        {
          name: "ofQuote",
          type: "address",
        },
      ],
      name: "getReferencePrice",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "numRegisteredAssets",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
        {
          name: "withStartId",
          type: "uint256",
        },
      ],
      name: "getDataHistory",
      outputs: [
        {
          name: "",
          type: "uint256[1024]",
        },
        {
          name: "",
          type: "uint256[1024]",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "isRegistered",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getSymbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "decimal",
          type: "uint256",
        },
        {
          name: "url",
          type: "string",
        },
        {
          name: "ipfsHash",
          type: "bytes32",
        },
        {
          name: "chainId",
          type: "bytes32",
        },
        {
          name: "breakIn",
          type: "address",
        },
        {
          name: "breakOut",
          type: "address",
        },
      ],
      name: "register",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "id",
          type: "uint256",
        },
      ],
      name: "getRegisteredAssetAt",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "url",
          type: "string",
        },
        {
          name: "ipfsHash",
          type: "bytes32",
        },
      ],
      name: "updateDescriptiveInformation",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "ofAsset",
          type: "address",
        },
      ],
      name: "getDecimals",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getQuoteAsset",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getLastUpdateTimestamp",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "QUOTE_ASSET",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      inputs: [
        {
          name: "ofQuoteAsset",
          type: "address",
        },
        {
          name: "interval",
          type: "uint256",
        },
        {
          name: "validity",
          type: "uint256",
        },
      ],
      payable: false,
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "id",
          type: "uint256",
        },
      ],
      name: "DataUpdated",
      type: "event",
    },
  ];
  return api.newContract(abi, "0x9ffE1fcE6DC97834c5733362d229dFc997299a79");
};

export default getDataFeedContract;

// TODO: uncomment this and delete above -only purpose of above was testing filters
// import Api from "@parity/api";
// import fs from "fs";
// import addressBook from "@melonproject/protocol/address-book.json";
// // import getConfig from "../../version/calls/getConfig";
// // TODO: bring back getConfig

// import setup from "../../utils/setup";

// /**
//  * Gets contract instance of deployed DataFeed
//  */
// const getDataFeedContract = async () => {
//   const api = new Api(setup.provider);
//  const abi = JSON.parse(fs.readFileSync(
//       "node_modules/@melonproject/protocol/out/datafeeds/DataFeed.abi",
//     ),);
//   return api.newContract(abi, addressBook.kovan.DataFeed);
// };

// export default getDataFeedContract;
