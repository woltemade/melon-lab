import { connect } from "react-redux";
import App from "./App";

const mapStateToProps = state => ({
  onboardingState: state.app.onboardingState,
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
