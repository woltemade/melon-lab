import { connect } from "react-redux";

import { actions } from "../actions/fund";
import SignCompetitionTerms from "../components/organisms/SignCompetitionTerms";

const mapStateToProps = state => ({
  fundAddress: state.fund.address,
  managerAddress: state.ethereum.account,
  competitionSignature: state.fund.competitionSignature,
  r: state.fund.competitionSignature
    ? state.fund.competitionSignature.r
    : undefined,
  s: state.fund.competitionSignature
    ? state.fund.competitionSignature.s
    : undefined,
  v: state.fund.competitionSignature
    ? state.fund.competitionSignature.v
    : undefined,
  needsToRegister: state.fund.needsToRegister,
});

const mapDispatchToProps = dispatch => ({
  sign: () => dispatch(actions.signCompetitionRequested()),
  isRegistered: () => dispatch(actions.isRegistered()),
});

const SignCompetitionTermsRedux = connect(mapStateToProps, mapDispatchToProps)(
  SignCompetitionTerms,
);

export default SignCompetitionTermsRedux;
