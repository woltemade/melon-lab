import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../../containers/Factsheet";
import Holdings from "../../containers/Holdings";
import Administration from "../../containers/Administration";
import Orderbook from "../../containers/Orderbook";
import RecentTrades from "../../containers/RecentTrades";
import TradeHistory from "../../containers/TradeHistory";
import GetStarted from "../organisms/GetStarted";
import Participation from "../../containers/Participation";
import TradeHelper from "../../containers/TradeHelper";
import Trade from "../../containers/Trade";

const Fund = ({ isVisitor, isInvestor, isManager, fundAddress }) => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet />
        {isManager ? <Administration /> : <div />}
        {isVisitor ? <GetStarted /> : <div />}
        {isInvestor || isManager ? <Participation /> : <div />}
      </Card.Group>
      <br />
      <Holdings address={fundAddress} />
      <br />
      {isManager ? (
        <div>
          {" "}
          <Trade /> <TradeHelper />
        </div>
      ) : (
        <div />
      )}
      <br />
      <Orderbook />
      <br />
      <RecentTrades />
      <br />
      <TradeHistory address={fundAddress} />
    </div>
    <br />
  </div>
);

export default Fund;
