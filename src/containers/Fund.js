import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions as fundActions } from "../actions/fund";
import { actions as adminActions } from "../actions/administration";
import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  pendingRequet: state.general.pendingRequest,
  loading: state.app.transactionInProgress,
  adminProps: {
    subscriptionAllowed: state.fund.subscriptionAllowed,
    redemptionAllowed: state.fund.redemptionAllowed,
  },
  isOwner: state.ethereum.account === state.fund.owner,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFund: address => dispatch(fundActions.set(address)),
  adminActions: {
    toggleSubscription: () =>
      dispatch(
        adminActions.toggleSubscription(ownProps.match.params.fundAddress),
      ),
    toggleRedemption: () =>
      dispatch(
        adminActions.toggleRedemption(ownProps.match.params.fundAddress),
      ),
    convertUnclaimedRewards: () =>
      dispatch(
        adminActions.convertUnclaimedRewards(ownProps.match.params.fundAddress),
      ),
    shutdown: () =>
      dispatch(adminActions.shutdown(ownProps.match.params.fundAddress)),
  },
});

const FundLifecycle = lifecycle({
  componentDidMount() {
    this.props.setFund(this.props.match.params.fundAddress);
  },
})(Fund);

const FundContainer = connect(mapStateToProps, mapDispatchToProps)(
  FundLifecycle,
);

export default FundContainer;
