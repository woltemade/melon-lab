import { connect } from "react-redux";

import isSameAddress from "../utils/isSameAddress";
import Fund from "../components/pages/Fund";

const mapStateToProps = (state, ownProps) => ({
  loading: state.app.transactionInProgress,
  isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
  isInvestor:
    state.app.isReadyToInteract &&
    !isSameAddress(state.ethereum.account, state.fund.owner),
  isManager:
    state.app.isReadyToInteract &&
    isSameAddress(state.ethereum.account, state.fund.owner),
  canInvest: state.app.isReadyToInteract,
  pendingRequest: state.fund.pendingRequest,
  // fundAddress: ownProps.match.params.fundAddress,
});

const FundContainer = connect(mapStateToProps)(Fund);

export default FundContainer;
