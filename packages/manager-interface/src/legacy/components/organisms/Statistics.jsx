import React from "react";
import { List, Card } from "semantic-ui-react";

const Statistics = ({
  rewardsSum,
  investmentsSum,
  redeemalsSum,
  tradesCount,
  highestSharePrice,
  netAssetValue,
}) => (
  <Card centered>
    <Card.Content>
      <Card.Header>Statistics</Card.Header>
      <br />
      In development
      <List>
        <List.Item as="a">
          <List.Content>
            <List.Header>All time reward payout: {rewardsSum} MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <List.Header>All time investment: {investmentsSum} MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <List.Header>All time redeemals: {redeemalsSum} MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <List.Header>All time number of trades: {tradesCount}</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <List.Header>
              All time high share price: {highestSharePrice}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <List.Header>All time net asset value: {netAssetValue}</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Statistics;
