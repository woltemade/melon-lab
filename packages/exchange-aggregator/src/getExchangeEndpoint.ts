const getExchangeEndpoint = {
  live: {
    radarRelay: () => 'wss://api.radarrelay.com/0x/v0/ws',
    etherDelta: baseTokenAddress =>
      `https://api.etherdelta.com/orders/${baseTokenAddress}/0`,
  },
  kovan: {
    radarRelay: () => 'wss://ws.kovan.radarrelay.com/0x/v0/ws',
  },
};

export default getExchangeEndpoint;
