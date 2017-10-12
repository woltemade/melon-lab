import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const Factsheet = props => (
  <Card id="factsheet">
    <Card.Content>
      <Card.Header>
        {props.name}
      </Card.Header>
      <List>
        <List.Item>

          <List.Content>
            Inception date: {props.inception}
          </List.Content>
        </List.Item>
        <List.Item>

          <List.Content href="#holdings">
            AUM: {props.aum} MLN
          </List.Content>
        </List.Item>
        <List.Item>

          <List.Content href="#holdings">
            Share Price: {props.sharePrice} MLN/Share
          </List.Content>
        </List.Item>
        <List.Item>

          <List.Content>
              Total number of shares: {props.totalSupply}
          </List.Content>
        </List.Item>
        <List.Item>

          <List.Content>
            Shares owned by me: {props.personalStake}
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item>

          <List.Content>
            Management Reward: {props.managementReward}%
          </List.Content>
        </List.Item>
        <List.Item>

          <List.Content>
            Performance Reward: {props.performanceReward}%
          </List.Content>
        </List.Item>
        <List.Item>

          <List.Content>
            Unclaimed rewards: {props.unclaimedRewards} MLN
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item>

          <List.Content href="https://ipfs.io/ipfs/QmSe6E2pw3htMWTDybMxUjEgKRUBawTSQXTF3nbpQ2EukP/" target="_blank">
            Contact Manager
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Factsheet;
