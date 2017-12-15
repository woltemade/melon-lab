import { connect } from "react-redux";
import { reduxForm, SubmissionError } from "redux-form";
import { importWalletFromMnemonic } from "@melonproject/melon.js";

import { actions as routeActions } from "../actions/routes";
import { actions } from "../actions/account";
import Restore from "../components/organisms/account/Restore";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // importWallet: actions.importWallet(),
  // en
});

const onSubmit = (values, dispatch) => {
  try {
    importWalletFromMnemonic(values.mnemonic);
    dispatch(actions.restoreFromMnemonic(values.mnemonic));
  } catch (err) {
    console.log(err);
    throw new SubmissionError({
      mnemonic: "Invalid BIP39 mnemonic",
      _error: "Invalid BIP39 mnemonic",
    });
  }
};

const RestoreRedux = connect(mapStateToProps, mapDispatchToProps)(Restore);
const RestoreForm = reduxForm({ form: "restore", onSubmit })(RestoreRedux);

export default RestoreForm;
