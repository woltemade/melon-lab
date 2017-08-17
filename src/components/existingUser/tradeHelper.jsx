import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const TradeHelper = () =>
  (<Card centered>
    <Card.Content>
      <Card.Header>Overview</Card.Header>
      <br />
      <br />
      <Card.Meta>
        <strong>XBT/MLN</strong>
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
            <List.Header>24h Volume: 1700 XBT</List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>XBT Balance: 0</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>MLN Balance: 207</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>);

export default TradeHelper;
