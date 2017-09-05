import { connect } from "react-redux";
import Participation from "./participation";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.participation,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: () => {
    dispatch(creators.invest());
  },
  onChange: event => {
    dispatch(creators.change({ [event.target.name]: event.target.value }));
  },
  onSelect: (event, { name }) => {
    dispatch(creators.change({ participationType: name }));
  },
});

const ParticipationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Participation,
);

export default ParticipationContainer;
