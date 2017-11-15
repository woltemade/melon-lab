import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const TradeHelper = props => (
  <Card centered>
    <Card.Content>
      <Card.Header>{props.assetPair}</Card.Header>
      <br />
      <List>
        <List.Item as="a">

          <List.Content onClick={() => props.changePrice(props.last)}>
              Last Price: {props.last}
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content onClick={() => props.changePrice(props.bid)}>
              Bid : {props.bid}
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content onClick={() => props.changePrice(props.ask)}>
              Ask: {props.ask}
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">

          <List.Content onClick={() => props.changeQuantity(props.baseTokenBalance)}>
            {props.baseTokenSymbol} Balance: {props.baseTokenBalance}
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content onClick={() => props.changeTotal(props.quoteTokenBalance)}>
            {props.quoteTokenSymbol} Balance: {props.quoteTokenBalance}
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default TradeHelper;
