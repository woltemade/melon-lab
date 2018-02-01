import { connect } from "react-redux";

import { actions } from "../actions/administration";
import Administration from "../components/organisms/Administration";

const mapStateToProps = state => ({
  subscriptionAllowed: state.fund.subscriptionAllowed,
  redemptionAllowed: state.fund.redemptionAllowed,
  loading: state.app.transactionInProgress,
});

const mapDispatchToProps = dispatch => ({
  toggleSubscription: () => dispatch(actions.toggleSubscription()),
  toggleRedemption: () => dispatch(actions.toggleRedemption()),
  convertUnclaimedRewards: () => dispatch(actions.convertUnclaimedRewards()),
  shutdown: () => dispatch(actions.shutdown()),
});

const AdministrationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Administration,
);

export default AdministrationContainer;
