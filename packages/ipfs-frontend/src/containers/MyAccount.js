import { connect } from "react-redux";

import { actions } from "../actions/account";
import { actions as routeActions } from "../actions/routes";
import MyAccount from "../components/organisms/MyAccount";

const mapStateToProps = state => ({
  currentAddress: state.ethereum.account,
  associatedFund: state.app.usersFund,
  networkId: state.ethereum.network,
});

const mapDispatchToProps = dispatch => ({
  deleteWallet: () => dispatch(actions.deleteWallet()),
  gotoAccount: () => dispatch(routeActions.account()),
});

const MyAccountRedux = connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export default MyAccountRedux;
