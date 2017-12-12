import { connect } from "react-redux";

import { actions } from "../actions/newUser";
import NewUser from "../components/organisms/NewUser";

const mapStateToProps = state => ({
  subscriptionAllowed: state.fund.subscriptionAllowed,
  redemptionAllowed: state.fund.redemptionAllowed,
  loading: state.app.transactionInProgress,
});

const mapDispatchToProps = dispatch => ({
  generateWallet: () => dispatch(actions.generateWallet()),
});

const NewUserContainer = connect(mapStateToProps, mapDispatchToProps)(NewUser);

export default NewUserContainer;
