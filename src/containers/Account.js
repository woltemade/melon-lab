import { connect } from "react-redux";

import { actions } from "../actions/account";
import { actions as routeActions } from "../actions/routes";
import Account from "../components/pages/Account";

const mapStateToProps = state => ({
  ...state.account,
  setupAction: routeActions.setup(),
  restoreWalletAction: routeActions.restore(),
});

const mapDispatchToProps = dispatch => ({
  generateWallet: () => dispatch(actions.generateWallet()),
  iSaved: () => dispatch(actions.iSaved()),
  encryptWallet: () => dispatch(actions.encryptWallet()),
  // TODO:we need to wipe out unencrypted wallet from redux on account.wallet after encryptWallet
});

const AccountRedux = connect(mapStateToProps, mapDispatchToProps)(Account);

export default AccountRedux;
