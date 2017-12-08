import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../../containers/Factsheet";
import FundHoldings from "../../containers/Holdings";

import Administration from "../../containers/Administration";

import ParticipationForm from "../organisms/ParticipationForm";

// TODO: Remove legacyComponents
/*
import FundHoldingsContainer from "../../legacyComponents/fundHoldings/container";
import OrderbookContainer from "../../legacyComponents/orderbook/container";
import RecentTradesContainer from "../../legacyComponents/recentTrades/container";
import TradeContainer from "../../legacyComponents/trade/container";
import TradeHelperContainer from "../../legacyComponents/tradeHelper/container";
import TradingActivityContainer from "../../legacyComponents/tradingActivity/container";
*/

const ManagerView = ({
  isOwner,
  loading,
  isVisitor,
  isInvestor,
  isManager,
  fundAddress,
}) => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet />
        {isManager ? <Administration /> : <div />}
        {/* {isInvestor ? <ParticipationForm /> : <div />} */}
      </Card.Group>
      <FundHoldings address={fundAddress} />
    </div>
    {/*
    <div>
      <Participation />
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
    */}
    <br />
  </div>
);

export default ManagerView;
