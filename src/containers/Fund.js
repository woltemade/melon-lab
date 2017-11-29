import BigNumber from "bignumber.js";
import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/fund";
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
