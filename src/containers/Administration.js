import { connect } from "redux";

import { actions } from "../actions/administration";
import Administration from "../components/organisms/Administration";

const mapStateToProps = state => ({
  subscriptionAllowed: state.fund.subscriptionAllowed,
  redemptionAllowed: state.fund.redemptionAllowed,
  loading: state.app.transactionInProgress,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSubscription: () =>
    dispatch(actions.toggleSubscription(ownProps.match.params.fundAddress)),
  toggleRedemption: () =>
    dispatch(actions.toggleRedemption(ownProps.match.params.fundAddress)),
  convertUnclaimedRewards: () =>
    dispatch(
      actions.convertUnclaimedRewards(ownProps.match.params.fundAddress),
    ),
  shutdown: () => dispatch(actions.shutdown(ownProps.match.params.fundAddress)),
});

const AdministrationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Administration,
);

export default AdministrationContainer;
