import { connect } from "react-redux";
import TradeHelper from "../../components/existingUser/tradeHelper";
import { creators } from "../ducks/tradeHelper";

const mapStateToProps = state => ({
  ...state.general,
  ...state.tradeHelper,
});

const mapDispatchToProps = dispatch => ({
  // prefill: order => {
  //   dispatch(creators.prefill(order));
  // },
  // onChange: event => {
  //   dispatch(creators.change({ [event.target.name]: event.target.value }));
  // },
  // placeOrder: () => {
  //   dispatch(creators.placeOrder());
  // },
});

const TradeHelperContainer = connect(mapStateToProps, mapDispatchToProps)(
  TradeHelper,
);

export default TradeHelperContainer;
