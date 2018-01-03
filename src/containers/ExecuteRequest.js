import { connect } from "react-redux";
import ExecuteRequest from "../components/organisms/ExecuteRequest";
import { actions } from "../actions/participation";

const mapStateToProps = state => ({
  readyToExecute: state.fund.readyToExecute,
});

const mapDispatchToProps = dispatch => ({
  onExecute: () => {
    dispatch(actions.execute());
  },
});

const ExecuteRequestContainer = connect(mapStateToProps, mapDispatchToProps)(
  ExecuteRequest,
);

export default ExecuteRequestContainer;
