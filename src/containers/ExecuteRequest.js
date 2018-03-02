import { connect } from "react-redux";
import ExecuteRequest from "../components/organisms/ExecuteRequest";
import { actions } from "../actions/participation";

const mapStateToProps = state => ({
  readyToExecute: state.fund.readyToExecute,
  targetDate: new Date(
    Date.now() + state.fund.pendingRequest.canBeExecutedInMs,
  ),
  requestId: state.fund.pendingRequest.id,
});

const mapDispatchToProps = dispatch => ({
  onExecute: requestId => {
    dispatch(actions.execute(requestId));
  },
});

const ExecuteRequestContainer = connect(mapStateToProps, mapDispatchToProps)(
  ExecuteRequest,
);

export default ExecuteRequestContainer;
