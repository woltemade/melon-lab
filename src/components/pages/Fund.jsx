import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../../containers/Factsheet";
import Holdings from "../../containers/Holdings";
// import Administration from "../../containers/Administration";
import Orderbook from "../../containers/Orderbook";
import RecentTrades from "../../containers/RecentTrades";
import TradeHistory from "../../containers/TradeHistory";
import GetStarted from "../organisms/GetStarted";
import Participation from "../../containers/Participation";

const ManagerView = ({ isVisitor, isInvestor, isManager, fundAddress }) => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet />
        {/* {isManager ? <Administration /> : <div />} */}
        {isVisitor ? <GetStarted /> : <div />}
        {isInvestor ? <Participation /> : <div />}
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
    <br />
  </div>
);

export default ManagerView;
