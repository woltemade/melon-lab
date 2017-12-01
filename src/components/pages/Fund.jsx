import React from "react";
import { Card } from "semantic-ui-react";

import Factsheet from "../../containers/Factsheet";
import Administration from "../organisms/Administration";
import Participation from "../organisms/Participation";

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
  adminActions,
  adminProps,
  factsheet,
  isOwner,
  loading,
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
    <div>
      <Participation
        {...participationActions}
        {...participationProps}
        loading={loading}
      />
    </div>
    {/*
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
