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
  baseBalance,
  quoteBalance,
}) => (
  <Card centered>
    <Card.Content>
      <Card.Header>
        {baseTokenSymbol}/{quoteTokenSymbol}
      </Card.Header>
      <br />
      <List>
        <List.Item as="a">
          <List.Content onClick={() => setPrice(last)}>
            Last Price: {last}
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content onClick={() => setPrice(bid)}>Bid : {bid}</List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content onClick={() => setPrice(ask)}>Ask: {ask}</List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <List.Content onClick={() => setQuantity(baseBalance)}>
            {baseTokenSymbol} Balance: {baseBalance}
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content onClick={() => setTotal(quoteBalance)}>
            {quoteTokenSymbol} Balance: {quoteBalance}
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default TradeHelper;
