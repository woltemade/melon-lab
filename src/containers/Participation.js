import { connect } from "react-redux";

import Participation from "../components/organisms/ParticipationForm";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  /* ... */
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  /* ... */
});

const ParticipationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Participation,
);

export default ParticipationContainer;
