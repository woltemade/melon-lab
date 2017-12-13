import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { actions } from "../actions/participation";

import Participation from "../components/organisms/ParticipationForm";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  /* ... */
});

const onSubmit = (values, dispatch) => {
  dispatch(actions.subscribe(values));
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  /* ... */
});

const ParticipationRedux = connect(mapStateToProps, mapDispatchToProps)(
  Participation,
);

const ParticipationForm = reduxForm({
  form: "participation",
  onSubmit,
})(ParticipationRedux);

export default ParticipationForm;
