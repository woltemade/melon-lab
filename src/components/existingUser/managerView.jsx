import React from "react";
import { Card } from "semantic-ui-react";
import FactsheetContainer from "../../redux/containers/factsheet";
import FundHoldingsContainer from "../../redux/containers/fundHoldings";
import OrderbookContainer from "../../redux/containers/orderbook";
import RecentTradesContainer from "../../redux/containers/recentTrades";
import TradeContainer from "../../redux/containers/trade";
import TradeHelperContainer from "../../redux/containers/tradeHelper";

import FundActivity from "./fundActivity";
import TradingActivity from "./tradingActivity";
import TradeHelper from "./tradeHelper";
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
