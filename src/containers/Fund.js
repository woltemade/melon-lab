import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/fund";
import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  pendingRequet: state.general.pendingRequest,
  factsheet: {
    aum: new BigNumber(state.fund.aum || 0).toFixed(4),
    creationDate: state.fund.creationDate,
    managementReward: state.fund.managementReward,
    name: state.fund.name,
    performanceReward: state.fund.performanceReward,
    personalStake: state.fund.personalStake,
    sharePrice: new BigNumber(state.fund.sharePrice || 0).toFixed(4),
    totalSupply: state.fund.totalSupply,
  },
});

const mapDispatchToProps = dispatch => ({
  setFund: address => {
    dispatch(actions.set(address));
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
