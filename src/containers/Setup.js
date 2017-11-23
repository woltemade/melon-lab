import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Setup from "../components/organisms/Setup";
import { actions } from "../actions/fund";

/*
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
*/

const onSubmit = (values, dispatch) => {
  dispatch(actions.requestSetup(values.name));
};

const SetupContainer = reduxForm({
  form: "setup",
  onSubmit,
})(Setup);

export default SetupContainer;
