import React from "react";
import { Card } from "semantic-ui-react";
import FactsheetContainer from "../factsheet/container";
import FundHoldingsContainer from "../fundHoldings/container";
import OrderbookContainer from "../orderbook/container";
import RecentTradesContainer from "../recentTrades/container";
import TradeContainer from "../trade/container";
import TradeHelperContainer from "../tradeHelper/container";
import ParticipationContainer from "../participation/container";
import ExecuteRequestContainer from "../executeRequest/container";
import TradingActivityContainer from "../tradingActivity/container";
// import FundActivity from "../fundActivity/fundActivity";
import Settings from "../settings/settings";

const ManagerView = props => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <FactsheetContainer />
        {/* <FundActivity /> */}
        <Settings />
        {props.general.pendingRequest ? (
          <ExecuteRequestContainer />
        ) : (
          <ParticipationContainer />
        )}
      </Card.Group>
    </div>
    <div>
      <br />
      <br />
      <FundHoldingsContainer />
    </div>
    <br />
    <br />
    <br />
    <div>
      <Card.Group>
        <TradeContainer />
        <TradeHelperContainer />
      </Card.Group>
    </div>
    <br />
    <br />
    <br />
    <OrderbookContainer />
    <br />
    <br />
    <br />
    <RecentTradesContainer />
    <br />
    <br />
    <br />
    <div>
      <TradingActivityContainer />
    </div>
    <br />
    <br />
    <br />
  </div>
);

export default ManagerView;
