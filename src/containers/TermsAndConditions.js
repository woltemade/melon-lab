import { connect } from "react-redux";

import { actions } from "../actions/fund";
import TermsAndConditions from "../components/organisms/TermsAndConditions";

const mapStateToProps = state => ({
  networkId: state.ethereum.network,
});

const mapDispatchToProps = dispatch => ({
  sign: () => dispatch(actions.signRequested()),
});

const TermsAndConditionsRedux = connect(mapStateToProps, mapDispatchToProps)(
  TermsAndConditions,
);

export default TermsAndConditionsRedux;
