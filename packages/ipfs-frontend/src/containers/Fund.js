import { connect } from "react-redux";

import isSameAddress from "../utils/isSameAddress";
import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  loading: state.fund.loading,
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
