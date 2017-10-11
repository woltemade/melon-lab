import React from "react";
import { List, Card, Icon } from "semantic-ui-react";

const Settings = props => (
  <Card centered id="settings">
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">
        Please wait for upcoming Metamask popup
      </div>
    </div>
    <Card.Content>
      <Card.Header>Settings</Card.Header>
      <br />
      <br />
      <List>
        {props.subscriptionAllowed ? (
          <List.Item
            as="a"
            onClick={() => props.onToggle("toggleSubscription")}
          >
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>Disable subscription</List.Header>
            </List.Content>
          </List.Item>
        ) : (
          <List.Item
            as="a"
            onClick={() => props.onToggle("toggleSubscription")}
          >
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>Enable subscription</List.Header>
            </List.Content>
          </List.Item>
        )}

        {props.redemptionAllowed ? (
          <List.Item as="a" onClick={() => props.onToggle("toggleRedemption")}>
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>Disable redemption in MLN</List.Header>
            </List.Content>
          </List.Item>
        ) : (
          <List.Item as="a" onClick={() => props.onToggle("toggleRedemption")}>
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>Enable redemption in MLN</List.Header>
            </List.Content>
          </List.Item>
        )}

        <List.Item as="a" onClick={() => props.convertUnclaimedRewards()}>
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Convert unclaimed rewards: 0 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a" onClick={() => props.shutDown()}>
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Irreversibly shut down fund</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Settings;
