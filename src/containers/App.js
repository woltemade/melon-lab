import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import App from "../components/pages/App";

const mapStateToProps = state => ({
  route: state.location.type,
  usersFund: state.app.usersFund,
  onboardingState: state.app.onboardingState,
  isReadyToTrade: state.app.isReadyToTrade,
  isReadyToVisit: state.app.isReadyToVisit,
  mlnBalance: new BigNumber(state.ethereum.mlnBalance || 0).toFixed(4),
  ethBalance: new BigNumber(state.ethereum.ethBalance || 0).toFixed(4),
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
