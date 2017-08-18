import { connect } from "react-redux";
import Factsheet from "../../components/existingUser/factsheet";
import { creators } from "../ducks/factsheet";

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
