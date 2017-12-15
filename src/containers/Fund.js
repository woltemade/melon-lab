import { connect } from "react-redux";

import Fund from "../components/pages/Fund";

const mapStateToProps = (state, ownProps) => ({
  loading: state.app.transactionInProgress,
  isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
  isInvestor:
    state.app.isReadyToInteract && state.ethereum.account !== state.fund.owner,
  isManager:
    state.app.isReadyToInteract && state.ethereum.account === state.fund.owner,
  // fundAddress: ownProps.match.params.fundAddress,
});

const FundContainer = connect(mapStateToProps)(Fund);

export default FundContainer;
