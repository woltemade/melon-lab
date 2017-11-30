import BigNumber from "bignumber.js";
import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions as fundActions } from "../actions/fund";
import { actions as adminActions } from "../actions/administration";
import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  pendingRequet: state.general.pendingRequest,
  factsheet: {
    aum: new BigNumber(state.fund.aum || 0).toFixed(4),
    creationDate: moment(state.fund.creationDate).format("D. MMM YYYY HH:mm"),
    managementReward: new BigNumber(state.fund.managementReward || 0).toFixed(
      4,
    ),
    name: state.fund.name,
    performanceReward: new BigNumber(state.fund.performanceReward || 0).toFixed(
      4,
    ),
    personalStake: new BigNumber(state.fund.personalStake || 0).toFixed(4),
    sharePrice: new BigNumber(state.fund.sharePrice || 0).toFixed(4),
    totalSupply: new BigNumber(state.fund.totalSupply || 0).toFixed(4),
  },
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
