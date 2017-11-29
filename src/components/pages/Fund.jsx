import React from "react";
import { Card } from "semantic-ui-react";
import FactsheetContainer from "../../legacyComponents/factsheet/container";
import FundHoldingsContainer from "../../legacyComponents/fundHoldings/container";
import OrderbookContainer from "../../legacyComponents/orderbook/container";
import RecentTradesContainer from "../../legacyComponents/recentTrades/container";
import TradeContainer from "../../legacyComponents/trade/container";
import TradeHelperContainer from "../../legacyComponents/tradeHelper/container";
import ParticipationContainer from "../../legacyComponents/participation/container";
import ExecuteRequestContainer from "../../legacyComponents/executeRequest/container";
import TradingActivityContainer from "../../legacyComponents/tradingActivity/container";
import SettingsContainer from "../../legacyComponents/settings/container";

const ManagerView = props => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <FactsheetContainer />
        <SettingsContainer />
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
