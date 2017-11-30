import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../organisms/Factsheet";
import Administration from "../organisms/Administration";

// TODO: Remove legacyComponents
/*
import FundHoldingsContainer from "../../legacyComponents/fundHoldings/container";
import OrderbookContainer from "../../legacyComponents/orderbook/container";
import RecentTradesContainer from "../../legacyComponents/recentTrades/container";
import TradeContainer from "../../legacyComponents/trade/container";
import TradeHelperContainer from "../../legacyComponents/tradeHelper/container";
import ParticipationContainer from "../../legacyComponents/participation/container";
import ExecuteRequestContainer from "../../legacyComponents/executeRequest/container";
import TradingActivityContainer from "../../legacyComponents/tradingActivity/container";
*/

const ManagerView = ({
  factsheet,
  pendingRequest,
  adminActions,
  adminProps,
  loading,
  isOwner,
}) => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet {...factsheet} />
        {isOwner ? (
          <Administration {...adminActions} {...adminProps} loading={loading} />
        ) : (
          <div>visitor</div>
        )}
      </Card.Group>
    </div>
    {/*
        {pendingRequest ? (
          <ExecuteRequestContainer />
        ) : (
          <ParticipationContainer />
        )}
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
