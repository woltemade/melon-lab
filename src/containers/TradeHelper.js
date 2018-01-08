import { connect } from "react-redux";
import { change } from "redux-form";
import TradeHelper from "../components/organisms/TradeHelper";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.tradeHelper,
  last: state.recentTrades.trades.length
    ? displayNumber(
        state.recentTrades.trades[state.recentTrades.trades.length - 1].price,
      )
    : "N/A",
  bid: state.orderbook.buyOrders.length
    ? displayNumber(state.orderbook.buyOrders[0].price)
    : "N/A",
  ask: state.orderbook.sellOrders.length
    ? displayNumber(state.orderbook.sellOrders[0].price)
    : "N/A",
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
  baseTokenBalance: state.holdings.holdings.length
    ? displayNumber(
        state.holdings.holdings.find(o => o.name === state.app.assetPair.base)
          .balance,
      )
    : "-",
  quoteTokenBalance: state.holdings.holdings.length
    ? displayNumber(
        state.holdings.holdings.find(o => o.name === state.app.assetPair.quote)
          .balance,
      )
    : "-",
  strategy: state.form.trade.values.strategy,
});

const mapDispatchToProps = dispatch => ({
  setPrice: (price, strategy) => {
    if (strategy === "Limit") dispatch(change("trade", "price", price));
  },
  setQuantity: (quantity, strategy) => {
    if (strategy === "Limit") dispatch(change("trade", "quantity", quantity));
  },
  setTotal: (total, strategy) => {
    if (strategy === "Limit") dispatch(change("trade", "total", total));
  },
});

const TradeHelperContainer = connect(mapStateToProps, mapDispatchToProps)(
  TradeHelper,
);

export default TradeHelperContainer;
