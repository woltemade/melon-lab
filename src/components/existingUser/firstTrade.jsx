import React from "react";
import { List } from "semantic-ui-react";

const FirstTrade = () =>
  (<div>
    <p className="App-intro">
      You can now start trading. Choose one of the available asset pairs to
      start trading.
    </p>
    <div>
      <List as="ol">
        <List.Item as="li" value="*">
          ETH/MLN
        </List.Item>
        <List.Item as="li" value="*">
          DOT/MLN
        </List.Item>
        <List.Item as="li" value="*">
          XBT/MLN
        </List.Item>
        <List.Item as="li" value="*">
          EUR/MLN
        </List.Item>
        <List.Item as="li" value="*">
          REP/MLN
        </List.Item>
        <List.Item as="li" value="*">
          SNT/MLN
        </List.Item>
        <List.Item as="li" value="*">
          XRP/MLN
        </List.Item>
        <List.Item as="li" value="*">
          DGD/MLN
        </List.Item>
      </List>
    </div>
  </div>);

export default FirstTrade;
