const getExchangeEndpoint = {
  live: {
    radarRelay: () => 'wss://api.radarrelay.com/0x/v0/ws',
  },
  kovan: {
    radarRelay: () => 'wss://ws.kovan.radarrelay.com/0x/v0/ws',
  },
};

export default getExchangeEndpoint;
