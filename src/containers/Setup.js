import { connect } from "react-redux";
import Setup from "../components/organisms/Setup";
import { actions } from "../actions/fund";

const mapStateToProps = state => ({
  ...state.setup,
});

const mapDispatchToProps = dispatch => ({
  onCreate: () => {
    dispatch(actions.create());
  },
  onChange: event => {
    dispatch(actions.change({ [event.target.name]: event.target.value }));
  },
});

const SetupContainer = connect(mapStateToProps, mapDispatchToProps)(Setup);

export default SetupContainer;
