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

const ParticipationLifecycle = lifecycle({
  componentDidMount() {
    console.log("********* componenet did mount");
  },
  componentWillReceiveProps(nextProps) {
    console.log("******************");
    console.log(
      nextProps.onboardingState,
      onboardingPath.NOT_INVESTED_IN_OWN_FUND,
      nextProps.onboardingState,
      this.props.onboardingState,
      nextProps.usersFund,
      nextProps.fundAddress,
    );
    if (
      nextProps.onboardingState === onboardingPath.NOT_INVESTED_IN_OWN_FUND &&
      nextProps.onboardingState !== this.props.onboardingState &&
      nextProps.usersFund !== nextProps.fundAddress &&
      this.props.setup
    ) {
      this.props.requestFund(nextProps.usersFund);
    }
  },
})(Participation);

const ParticipationRedux = connect(mapStateToProps, mapDispatchToProps)(
  ParticipationLifecycle,
);

const ParticipationForm = reduxForm({
  form: "participation",
  onSubmit,
})(ParticipationRedux);

export default ParticipationForm;
