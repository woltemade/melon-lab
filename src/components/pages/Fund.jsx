import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../../containers/Factsheet";
import Holdings from "../../containers/Holdings";
import Administration from "../../containers/Administration";
import Orderbook from "../../containers/Orderbook";
import RecentTrades from "../../containers/RecentTrades";
import TradeHistory from "../../containers/TradeHistory";
import GetStarted from "../../containers/GetStarted";
import Participation from "../../containers/Participation";
import ExecuteRequest from "../../containers/ExecuteRequest";
import TradeHelper from "../../containers/TradeHelper";
import Trade from "../../containers/Trade";

const Fund = ({ isManager, fundAddress, canInvest, pendingRequest }) => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet />
        {isManager ? <Administration /> : <GetStarted />}
        {canInvest && !pendingRequest ? <Participation /> : <div />}
        {canInvest && pendingRequest ? <ExecuteRequest /> : <div />}
        {!canInvest ? <Card /> : <div />}
      </Card.Group>
      <br />
      <Holdings address={fundAddress} />
      <br />
      {isManager ? (
        <div>
          {" "}
          <Card.Group centered>
            <Trade />
            <TradeHelper />
          </Card.Group>
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
