import { connect } from "react-redux";

import { actions } from "../actions/fund";
import CompetitionRegistration from "../components/organisms/CompetitionRegistration";

const mapStateToProps = state => ({
  fundAddress: state.fund.address,
});

const mapDispatchToProps = dispatch => ({
  doneWithRegistration: () => dispatch(actions.showedRegistration()),
});

const CompetitionRegistrationRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompetitionRegistration);

export default CompetitionRegistrationRedux;
