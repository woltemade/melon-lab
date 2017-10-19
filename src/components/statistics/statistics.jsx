import React from "react";
import { List, Card, Icon } from "semantic-ui-react";

const Statistics = () => (
  <Card centered>
    <Card.Content>
      <Card.Header>Statistics</Card.Header>
      <br />
      In development
      <List>
        <List.Item as="a">

          <List.Content>
            <List.Header>All time reward payout: 127 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content>
            <List.Header>All time investment: 1270 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content>
            <List.Header>All time redeemals: 570 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content>
            <List.Header>All time number of trades: 1277</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content>
            <List.Header>All time high share price: 2,170</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">

          <List.Content>
            <List.Header>All time net asset value: 980</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Statistics;
