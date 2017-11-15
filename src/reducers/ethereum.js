const MAX_BLOCK_TIME_SECONDS = 14;

const providers = {
  METAMASK: "MetaMask",
  PARITY: "Personal Parity",
  HOSTED: "Hosted by us",
  NONE: "No provider found",
};

const networks = {
  1: "Main",
  42: "Kovan",
  null: "Unknown",
};

const initialState = {
  account: null,
  balance: null,
  blockNumber: 0,
  connected: false,
  lastUpdate: null,
  network: networks.null,
  provider: providers.NONE,
  ready: false,
  syncing: true,
};

const isConnected = state => state.providers !== providers.NONE;
const isUpToDate = state =>
  new Date() - state.lastUpdate < MAX_BLOCK_TIME_SECONDS * 1000;

const isReady = state =>
  isConnected(state) &&
  isUpToDate(state) &&
  state.network !== networks.null &&
  !state.syncing &&
  !!state.account &&
  state.balance > 0 &&
  state.blockNumber > 0;
