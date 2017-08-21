import React from "react";
import { Card } from "semantic-ui-react";
import FactsheetContainer from "../../redux/containers/factsheet";
import FundHoldingsContainer from "../../redux/containers/fundHoldings";
import OrderbookContainer from "../../redux/containers/orderbook";

import FundActivity from "./fundActivity";
import TradingActivity from "./tradingActivity";
import Trade from "./trade";
import TradeHelper from "./tradeHelper";
import RecentTrades from "./recentTrades";
import Settings from "./settings";
import Statistics from "./statistics";
import Participation from "./participation";

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
        <Trade />
        <TradeHelper />
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
    <RecentTrades />
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
