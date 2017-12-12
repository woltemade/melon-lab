import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../../containers/Factsheet";
import Holdings from "../../containers/Holdings";
// import Administration from "../../containers/Administration";
import Orderbook from "../../containers/Orderbook";
import RecentTrades from "../../containers/RecentTrades";
import TradeHistory from "../../containers/TradeHistory";
import GetStarted from "../organisms/GetStarted";
// import ParticipationForm from "../containers/Participation";

// TODO: Remove legacyComponents;
/*
import TradeContainer from "../../legacyComponents/trade/container";
import TradeHelperContainer from "../../legacyComponents/tradeHelper/container";
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
        {/* {isManager ? <Administration /> : <div />} */}
        {/* {isInvestor ? <ParticipationForm /> : <div />} */}
        {isVisitor ? <GetStarted /> : <div />}
      </Card.Group>
      <br />
      <Holdings address={fundAddress} />
      <br />
      <Orderbook />
      <br />
      <RecentTrades />
      <br />
      <TradeHistory address={fundAddress} />
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
