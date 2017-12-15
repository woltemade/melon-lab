import { connect } from "react-redux";
import { reduxForm, SubmissionError } from "redux-form";

import { actions } from "../actions/newUser";
import { actions as routeActions } from "../actions/routes";
import NewUser from "../components/pages/NewUser";

const mapStateToProps = state => ({
  ...state.newUser,
  mnemonic: window[state.newUser.newAddress],
  setupAction: routeActions.setup(),
});

const mapDispatchToProps = dispatch => ({
  generateWallet: () => dispatch(actions.generateWallet()),
  iSaved: () => dispatch(actions.iSaved()),
  encryptWallet: () => dispatch(actions.encryptWallet()),
  // TODO:we need to wipe out unencrypted wallet from redux on newUser.wallet after encryptWallet
});

const onSubmit = (values, dispatch) => {
  console.log(values);
  if (values.password !== values.repeat) {
    throw new SubmissionError({
      repeat: "Passwords do not match :(",
      _error: "Passwords do not match :(",
    });
  } else if (!values.password || values.password.length < 3) {
    throw new SubmissionError({
      password: "Password too short.",
      _error: "Password too short.",
    });
  } else {
    dispatch(actions.encryptWallet(values.password));
  }
};

const NewUserRedux = connect(mapStateToProps, mapDispatchToProps)(NewUser);

const NewUserForm = reduxForm({ form: "newUser", onSubmit })(NewUserRedux);

export default NewUserForm;
