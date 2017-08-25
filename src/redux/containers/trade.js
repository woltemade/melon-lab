import { connect } from "react-redux";
import Trade from "../../components/existingUser/trade";
import { creators } from "../ducks/trade";

const mapStateToProps = state => ({
  ...state.trade,
});

const mapDispatchToProps = dispatch => ({
  prefill: order => {
    dispatch(creators.prefill(order));
  },
});

const TradeContainer = connect(mapStateToProps, mapDispatchToProps)(Trade);

export default TradeContainer;
