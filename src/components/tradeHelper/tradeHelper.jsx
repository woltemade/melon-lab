import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const TradeHelper = props => (
  <Card centered>
    <Card.Content>
      <Card.Header>Overview</Card.Header>
      <br />
      <br />
      <Card.Meta>
        <strong>{props.assetPair}</strong>
      </Card.Meta>
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header onClick={() => props.changePrice(props.last)}>
              Last Price: {props.last}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header onClick={() => props.changePrice(props.bid)}>
              Bid : {props.bid}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header onClick={() => props.changePrice(props.ask)}>
              Ask: {props.ask}
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header
              onClick={() => props.changeQuantity(props.baseTokenBalance)}
            >
              {props.baseTokenSymbol} Balance: {props.baseTokenBalance}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header
              onClick={() => props.changeTotal(props.quoteTokenBalance)}
            >
              {props.quoteTokenSymbol} Balance: {props.quoteTokenBalance}
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default TradeHelper;
