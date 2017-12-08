import { connect } from "react-redux";
import ExecuteRequest from "./executeRequest";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.executeRequest,
});

const mapDispatchToProps = dispatch => ({
  handleFinish: () => {
    dispatch(creators.update({ readyToExecute: true }));
  },
  onExecute: () => {
    dispatch(creators.execute());
  },
});

const ExecuteRequestContainer = connect(mapStateToProps, mapDispatchToProps)(
  ExecuteRequest,
);

export default ExecuteRequestContainer;
