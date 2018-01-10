import BigNumber from "bignumber.js";
import { connect } from "react-redux";
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
  return { message: "Ready", type: statusTypes.GOOD };
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
  };
};

const mapDispatchToProps = dispatch => ({
  myAccount: () => routeActions.myAccount(),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
