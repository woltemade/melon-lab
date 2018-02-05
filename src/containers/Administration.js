import { connect } from "react-redux";

import { actions } from "../actions/administration";
import { actions as routeActions } from "../actions/routes";

import Administration from "../components/organisms/Administration";

const mapStateToProps = state => ({
  subscriptionAllowed: state.fund.subscriptionAllowed,
  redemptionAllowed: state.fund.redemptionAllowed,
  loading: state.app.transactionInProgress,
  fundAddress: state.fund.address,
  isCompeting: state.fund.isCompeting,
});

const mapDispatchToProps = dispatch => ({
  registerForCompetition: fundAddress =>
    dispatch(routeActions.competition(fundAddress)),
  toggleSubscription: () => dispatch(actions.toggleSubscription()),
  toggleRedemption: () => dispatch(actions.toggleRedemption()),
  convertUnclaimedRewards: () => dispatch(actions.convertUnclaimedRewards()),
  shutdown: () => dispatch(actions.shutdown()),
});

const AdministrationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Administration,
);

export default AdministrationContainer;
