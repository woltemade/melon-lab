import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { lifecycle } from "recompose";
import { actions } from "../actions/participation";
import Participation from "../components/organisms/ParticipationForm";
import { onboardingPath } from "../reducers/app";
import { actions as fundActions } from "../actions/fund";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  onboardingState: state.app.onboardingState,
  usersFund: state.app.usersFund,
  fundAddress: state.fund.address,
});

const onSubmit = (values, dispatch) => {
  dispatch(actions.subscribe(values));
};

const mapDispatchToProps = dispatch => ({
  requestFund: fundAddress => dispatch(fundActions.infoRequested(fundAddress)),
});

const ParticipationRedux = connect(mapStateToProps, mapDispatchToProps)(
  Participation,
);

const ParticipationForm = reduxForm({
  form: "participation",
  onSubmit,
})(ParticipationRedux);

export default ParticipationForm;
