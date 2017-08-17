import React from "react";
import {
  Table,
  List,
  Input,
  Button,
  Card,
  Icon,
  Divider,
} from "semantic-ui-react";
import Factsheet from "./factsheet";
import FundActivity from "./fundActivity";
import TradingActivity from "./tradingActivity";
import FundHoldings from "./fundHoldings";
import Trade from "./trade";
import TradeHelper from "./tradeHelper";
import OrderBook from "./orderbook";
import RecentTrades from "./recentTrades";
import Settings from "./settings";
import Statistics from "./statistics";
import Participation from "./participation";

const ManagerView = () =>
  (<div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet />
        <FundActivity />
        <TradingActivity />
      </Card.Group>
    </div>
    <div>
      <br />
      <br />
      <FundHoldings />
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
    <OrderBook />
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
