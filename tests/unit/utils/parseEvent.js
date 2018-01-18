import parseEvent from '../../../lib/utils/ethereum/parseEvent';

const tx = {
  address: '0x81bfb6a2db736c5ec06ddf4654478cf78b3e0be7',
  blockHash:
    '0x3760a8f7b43d9cff18f712697d28fa3f1eaacdbaa5aa7ac762458eb2202caacb',
  blockNumber: 3775002,
  data: '0x00000000000000000000000000000000000000000000000000000000000b481b',
  logIndex: 1,
  topics: [
    '0xcea04943b36b38f541b87028ed4da18dded81fd7741867c8320734d24b5b0ece',
  ],
  transactionHash:
    '0xaa6bbbcd417a122854c0098e9750ec678e6c4b429447525ad3e5a4b2727df898',
  transactionIndex: 0,
  transactionLogIndex: '0x1',
  type: 'mined',
};

const schema = {
  name: 'OrderUpdate',
  signature: 'OrderUpdate(uint256)',
  topic: '0xcea04943b36b38f541b87028ed4da18dded81fd7741867c8320734d24b5b0ece',
  abi: {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'OrderUpdate',
    type: 'event',
  },
};

test('parseEvent', () => {
  const parsed = parseEvent(tx, schema.abi);
  expect(parsed.id.toNumber()).toBe(739355);
});
