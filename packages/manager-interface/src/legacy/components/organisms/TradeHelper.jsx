import React from "react";
import { List, Card, Divider } from "semantic-ui-react";

const TradeHelper = ({
  baseTokenSymbol,
  quoteTokenSymbol,
  last,
  bid,
  ask,
  setPrice,
  setQuantity,
  setTotal,
  baseTokenBalance,
  quoteTokenBalance,
  strategy,
}) => (
  <Card centered>
    <Card.Content>
      <Card.Header>
        {baseTokenSymbol}/{quoteTokenSymbol}
      </Card.Header>
      <br />
      <List>
        <List.Item as="a">
          <List.Content onClick={() => setPrice(last, strategy)}>
            Last Price: {last}
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content onClick={() => setPrice(bid, strategy)}>
            Bid : {bid}
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content onClick={() => setPrice(ask, strategy)}>
            Ask: {ask}
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <List.Content onClick={() => setQuantity(baseTokenBalance, strategy)}>
            {baseTokenSymbol} Balance: {baseTokenBalance}
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content onClick={() => setTotal(quoteTokenBalance, strategy)}>
            {quoteTokenSymbol} Balance: {quoteTokenBalance}
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default TradeHelper;
