import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import { providers, getNetworkName } from "@melonproject/melon.js";
import App from "../components/pages/App";
import { statusTypes } from "../components/organisms/ConnectionInfo";
import { actions as routeActions } from "../actions/routes";

const getStatus = ({
  syncing,
  blockNumber,
  isConnected,
  isUpToDate,
  isReadyToVisit,
  isReadyToInvest,
  isReadyToInteract,
  isDataValid,
  provider,
}) => {
  if (!isConnected)
    return { message: "Not connected to chain", type: statusTypes.ERROR };
  if (syncing) return { message: "Node not synced", type: statusTypes.WARNING };
  if (blockNumber === 0)
    return { message: "Loading ...", type: statusTypes.NEUTRAL };
  if (!isUpToDate)
    return { message: "Block overdue", type: statusTypes.WARNING };
  if (!isReadyToVisit)
    return { message: "Not ready", type: statusTypes.WARNING };
  if (!isDataValid)
    return { message: "Price feed down", type: statusTypes.ERROR };
  if (!isReadyToInteract)
    return { message: "Insufficent ETH", type: statusTypes.WARNING };
  if (!isReadyToInvest)
    return { message: "Insufficent MLN", type: statusTypes.WARNING };
  if ([providers.PARITY, providers.INJECTED].includes(provider)) {
    return { message: "Local node", type: statusTypes.GOOD };
  }
  return { message: "Melon Node", type: statusTypes.NEUTRAL };
};

const mapStateToProps = state => {
  const { message, type } = getStatus({
    ...state.app,
    ...state.ethereum,
  });
  return {
    route: state.location.type,
    usersFund: state.app.usersFund,
    onboardingState: state.app.onboardingState,
    isReadyToTrade: state.app.isReadyToTrade,
    isReadyToVisit: state.app.isReadyToVisit,
    walletAddress: state.ethereum.account,
    statusMessage: message,
    statusType: type,
    mlnBalance: new BigNumber(state.ethereum.mlnBalance || 0).toFixed(4),
    ethBalance: new BigNumber(state.ethereum.ethBalance || 0).toFixed(4),
    rootAction: routeActions.root(),
    accountAction: routeActions.myAccount(),
    network: state.ethereum.network,
    networkName: getNetworkName(state.ethereum.network),
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
