import { connect } from "react-redux";
import RecentTrades from "./recentTrades";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.recentTrades,
});

const mapDispatchToProps = dispatch => ({
  onRequest: assetPair => {
    dispatch(creators.requestRecentTrades(assetPair));
  },
});

const RecentTradesContainer = connect(mapStateToProps, mapDispatchToProps)(
  RecentTrades,
);

export default RecentTradesContainer;
