import moment from "moment";
import { connect } from "react-redux";

import Factsheet from "../components/organisms/Factsheet";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  aum: displayNumber(state.fund.aum),
  creationDate: moment(state.fund.creationDate).format("D. MMM YYYY HH:mm"),
  loading: state.app.transactionInProgress,
  managementReward: displayNumber(state.fund.managementReward),
  name: state.fund.name,
  performanceReward: displayNumber(state.fund.performanceReward),
  personalStake: displayNumber(state.fund.personalStake),
  sharePrice: displayNumber(state.fund.sharePrice),
  totalSupply: displayNumber(state.fund.totalSupply),
});

const FactsheetContainter = connect(mapStateToProps)(Factsheet);

export default FactsheetContainter;
