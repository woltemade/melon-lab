import { connect } from "react-redux";

import { actions } from "../actions/fund";
import TermsAndConditions from "../components/organisms/TermsAndConditions";

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  sign: () => dispatch(actions.signRequested()),
});

const TermsAndConditionsRedux = connect(mapStateToProps, mapDispatchToProps)(
  TermsAndConditions,
);

export default TermsAndConditionsRedux;
