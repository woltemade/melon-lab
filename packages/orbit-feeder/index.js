import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import {
  getParityProvider,
  getConfig,
  getPriceFeedContract,
  getAddress,
  toReadable,
} from '@melonproject/melon.js';

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
};

const ipfs = new IPFS(ipfsOptions);
ipfs.on('error', console.error);
ipfs.on('ready', async () => {
  const environment = await getParityProvider();
  const config = await getConfig(environment);
  const mlnAddress = getAddress(config, 'ETH-T-M');
  const pricefeed = await getPriceFeedContract(environment);
  const orbitDB = new OrbitDB(ipfs);

  // console.log(JSON.stringify({ config, mlnAddress }, null, 4));

  const db = await orbitDB.log(`melon:PriceFeed:${mlnAddress}`);

  console.log(db.address.toString());

  pricefeed.instance.PriceUpdated.subscribe({}, async (err, res) => {
    const [isRecent, price, decimals] = await pricefeed.instance.getPrice.call(
      {},
      [mlnAddress],
    );
    const hash = await db.add(price.toString());
    console.log(err, res, toReadable(config, price, 'ETH-T-M'), hash);
  });

  /*

  const receiverIpfs = new IPFS({
    EXPERIMENTAL: {
      pubsub: true,
    },
    repo: './receiver',
  });
  receiverIpfs.on('ready', async () => {
    const receiverOrbit = new OrbitDB(receiverIpfs, './receiverDb');
    const receiverDb = await receiverOrbit.log(db.address.toString());
    receiverDb.events.on('replicated', () => {
      const res = receiverDb
        .iterator({ limit: -2 })
        .collect()
        .map(e => e.payload.value);
      console.log('REPLICATED \n', res.join('\n'));
    });
  });

  */
});

const getHistoricPrices = async () => {
  const environment = await getParityProvider();
  const { api } = environment;
  const config = await getConfig(environment);
  const mlnAddress = getAddress(config, 'ETH-T-M');
  // const pricefeedInceptions = 6047346;
  const pricefeed = await getPriceFeedContract(environment);

  const currentBlock = await api.eth.blockNumber();

  console.log(currentBlock);

  /*
    Would require pruninge mode archive the get all historic prices
    --pruning METHOD               Configure pruning of the state/storage trie. METHOD
                                   may be one of auto, archive, fast:
                                   archive - keep all state trie data. No pruning.
                                   fast - maintain journal overlay. Fast but 50MB used.
                                   auto - use the method most recently synced or
                                   default to fast if none synced (default: auto).
  */

  const beforeGetAllLogs = new Date();
  // pricefeed.instance.PriceUpdated.getAllLogs();
  const logs = await api.eth.getLogs({
    address: pricefeed.address,
    topics: [pricefeed.instance.PriceUpdated.signature],
    fromBlock: currentBlock.minus(1000), // 6520000, // 6047346, // 6522000
  });

  // console.log(new Date() - beforeGetAllLogs, logs);

  const pricesP = logs.map(async ({ blockNumber }) => {
    /* const [, price] = await pricefeed.instance.getPrice.call({ blockNumber }, [
      mlnAddress,
    ]);
    */
    const data = `0x${
      pricefeed.instance.getPrice.signature
    }000000000000000000000000${mlnAddress.slice(2)}`;

    const a = await api.eth.call(
      {
        to: pricefeed.address,
        data,
      },
      blockNumber,
    );

    const valid = a.slice(2, 2 + 64);
    const price = a.slice(2 + 64, 2 + 64 + 64);
    return parseInt(price, 16);
  });

  /*
  0000000000000000000000000000000000000000000000000000000000000045
  000000000000000000000000288A9fB92921472D29ab0b3C3e420a8E4Bd4f452
  */

  const prices = await Promise.all(pricesP);
  console.log(new Date() - beforeGetAllLogs, prices);
};
