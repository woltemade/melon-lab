import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import App from "../components/pages/App";

const mapStateToProps = state => ({
  fundAddress: state.fund.address,
  onboardingState: state.app.onboardingState,
  isReadyToTrade: state.app.isReadyToTrade,
  mlnBalance: new BigNumber(state.ethereum.mlnBalance).toFixed(4),
  ethBalance: new BigNumber(state.ethereum.ethBalance).toFixed(4),
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
