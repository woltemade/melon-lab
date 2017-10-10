import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const Factsheet = props => (
  <Card centered id="factsheet">
    <Card.Content>
      <Card.Header>
        <strong>{props.name} </strong>
      </Card.Header>
      <br />
      <Card.Meta />
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Inception date: {props.inception}</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header href="#holdings">AUM: {props.aum} MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header href="#holdings">
              Share Price: {props.sharePrice} MLN/Share
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header href="#participation">
              Total number of shares: {props.totalSupply}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header href="#participation">
              Shares owned by me: {props.personalStake}
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>
              Management Reward: {props.managementReward}%
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>
              Performance Reward: {props.performanceReward}%
            </List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header href="#settings">
              Unclaimed rewards: {props.unclaimedRewards} MLN
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header href="#settings">Settings</List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Contact Manager</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Factsheet;
