import { connect } from "react-redux";

import { actions } from "../actions/newUser";
import { actions as routeActions } from "../actions/routes";
import NewUser from "../components/pages/NewUser";

const mapStateToProps = state => ({
  ...state.newUser,
  setupAction: routeActions.setup(),
});

const mapDispatchToProps = dispatch => ({
  generateWallet: () => dispatch(actions.generateWallet()),
  iSaved: () => dispatch(actions.iSaved()),
  encryptWallet: () => dispatch(actions.encryptWallet()),
  // TODO:we need to wipe out unencrypted wallet from redux on newUser.wallet after encryptWallet
});

const NewUserContainer = connect(mapStateToProps, mapDispatchToProps)(NewUser);

export default NewUserContainer;
