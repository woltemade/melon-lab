import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const TradeHelper = props =>
  (<Card centered>
    <Card.Content>
      <Card.Header>Overview</Card.Header>
      <br />
      <br />
      <Card.Meta>
        <strong>
          {props.assetPair}
        </strong>
      </Card.Meta>
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Last Price: 0.2290</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Bid : 0.2286</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Ask: 0.2291</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>
              24h Volume: 1700 {props.baseTokenSymbol}
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>
              {props.baseTokenSymbol} Balance: {props.baseTokenBalance}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>
              {props.quoteTokenSymbol} Balance: {props.quoteTokenBalance}
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>);

export default TradeHelper;
