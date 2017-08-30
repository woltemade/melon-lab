import { connect } from "react-redux";
import Participation from "./participation";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.participation,
});

const mapDispatchToProps = dispatch => ({
  onInvest: () => {
    dispatch(creators.invest());
  },
  onChange: event => {
    dispatch(creators.change({ [event.target.name]: event.target.value }));
  },
});

const ParticipationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Participation,
);

export default ParticipationContainer;
