import React from "react";
import { Card } from "semantic-ui-react";
import FactsheetContainer from "../factsheet/container";
import FundHoldingsContainer from "../fundHoldings/container";
import OrderbookContainer from "../orderbook/container";
import RecentTradesContainer from "../recentTrades/container";
import TradeContainer from "../trade/container";
import TradeHelperContainer from "../tradeHelper/container";

import FundActivity from "../fundActivity/fundActivity";
import TradingActivity from "../tradingActivity/tradingActivity";
import Settings from "../settings/settings";
import Statistics from "../statistics/statistics";
import Participation from "../participation/participation";

const ManagerView = () =>
  (<div className="App">
    <br />
    <div>
      <Card.Group>
        <FactsheetContainer />
        <FundActivity />
        <TradingActivity />
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
    {/* </div> */}
    <br />
    <br />
    <br />
    <RecentTradesContainer />
    <br />
    <br />
    <br />
    <div>
      <Card.Group>
        <Settings />
        <Statistics />
        <Participation />
      </Card.Group>
    </div>
    <br />
    <br />
    <br />
  </div>);

export default ManagerView;
