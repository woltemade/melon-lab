import { connect } from "react-redux";
import GetStarted from "../components/organisms/GetStarted";
import { actions as routeActions } from "../actions/routes";

const mapStateToProps = state => ({
  usersFund: state.app.usersFund,
  getFundLinkAction: fundAddress => routeActions.fund(fundAddress),
  setupLinkAction: routeActions.setup(),
});

const GetStartedContainer = connect(mapStateToProps)(GetStarted);

export default GetStartedContainer;
