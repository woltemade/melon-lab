import { connect } from "react-redux";
import Factsheet from "./factsheet";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.factsheet,
});

const mapDispatchToProps = dispatch => ({
  onRequest: () => {
    dispatch(creators.requestInformations());
  },
  onUpdate: event => {
    dispatch(
      creators.updateInformations({ [event.target.name]: event.target.value }),
    );
  },
});

const FactsheetContainer = connect(mapStateToProps, mapDispatchToProps)(
  Factsheet,
);

export default FactsheetContainer;
