import React from "react";
import { List, Card, Icon } from "semantic-ui-react";

const Settings = props => (
  <Card centered id="settings">
    <Card.Content>
      <Card.Header>Fund Administration</Card.Header>
      <List>
        {props.subscriptionAllowed ? (
          <List.Item as="a"
            onClick={() => props.onToggle("toggleSubscription")}
          >

            <List.Content>
              Disable subscription
            </List.Content>
          </List.Item>
        ) : (
          <List.Item as="a"
            onClick={() => props.onToggle("toggleSubscription")}
          >

            <List.Content>
              Enable subscription
            </List.Content>
          </List.Item>
        )}

        {props.redemptionAllowed ? (
          <List.Item as="a" onClick={() => props.onToggle("toggleRedemption")}>

            <List.Content>
              Disable redemption in MLN
            </List.Content>
          </List.Item>
        ) : (
          <List.Item as="a" onClick={() => props.onToggle("toggleRedemption")}>

            <List.Content>
              Enable redemption in MLN
            </List.Content>
          </List.Item>
        )}

        <List.Item as="a" onClick={() => props.convertUnclaimedRewards()}>

          <List.Content>
            Convert unclaimed rewards: 0 MLN
          </List.Content>
        </List.Item>
        <List.Item as="a" onClick={() => props.shutDown()}>

          <List.Content>
            Irreversibly shut down fund
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">
        Please wait for upcoming Metamask popup
      </div>
    </div>
  </Card>
);

export default Settings;
