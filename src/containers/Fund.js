import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions as fundActions } from "../actions/fund";

import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  // pendingRequest: state.pendingRequest,
  loading: state.app.transactionInProgress,
  isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
  isInvestor:
    state.app.isReadyToInteract && state.app.usersFund !== state.fund.address,
  isManager:
    state.app.isReadyToInteract && state.ethereum.account === state.fund.owner,
});

const mapDispatchToProps = dispatch => ({
  setFund: address => dispatch(fundActions.set(address)),
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
