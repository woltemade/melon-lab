import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import Factsheet from "./factsheet";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.factsheet,
  aum: new BigNumber(state.factsheet.aum).toFixed(4),
  sharePrice: new BigNumber(state.factsheet.sharePrice).toFixed(4),
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
