import React from "react";
import { List, Card, Divider } from "semantic-ui-react";

const Factsheet = ({
  aum,
  creationDate,
  managementReward,
  name,
  performanceReward,
  personalStake,
  sharePrice,
  totalSupply,
}) => (
  <Card id="factsheet">
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <List>
        <List.Item>
          <List.Content>Creation date: {creationDate}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content href="#holdings">AUM: {aum} MLN</List.Content>
        </List.Item>
        <List.Item>
          <List.Content href="#holdings">
            Share Price: {sharePrice} MLN/Share
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Total number of shares: {totalSupply}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Shares owned by me: {personalStake}</List.Content>
        </List.Item>
        <Divider />
        <List.Item>
          <List.Content>Management Reward: {managementReward}%</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Performance Reward: {performanceReward}%</List.Content>
        </List.Item>

        <Divider />
        <List.Item>
          <List.Content href="http://melon.email" target="_blank">
            Contact Investors/Managers
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Factsheet;
