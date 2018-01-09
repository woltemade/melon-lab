import { connect } from "react-redux";

import { actions } from "../actions/account";
import MyAccount from "../components/organisms/MyAccount";

const mapStateToProps = state => ({
  currentAddress: state.ethereum.account,
  associatedFund: state.app.usersFund,
});

const mapDispatchToProps = dispatch => ({
  deleteWallet: () => dispatch(actions.deleteWallet()),
});

const MyAccountRedux = connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export default MyAccountRedux;
