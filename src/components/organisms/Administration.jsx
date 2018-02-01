import React from "react";
import { List, Card } from "semantic-ui-react";

const Administration = ({
  subscriptionAllowed,
  redemptionAllowed,
  toggleSubscription,
  toggleRedemption,
  convertUnclaimedRewards,
  shutdown,
  loading,
  registerForCompetition,
  fundAddress,
}) => (
  <Card centered id="settings">
    <Card.Content>
      <Card.Header>Fund Administration</Card.Header>
      <List>
        <List.Item as="a" onClick={() => registerForCompetition(fundAddress)}>
          <List.Content>Register for competition</List.Content>
        </List.Item>
        {subscriptionAllowed ? (
          <List.Item as="a" onClick={toggleSubscription}>
            <List.Content>Disable subscription</List.Content>
          </List.Item>
        ) : (
          <List.Item as="a" onClick={toggleSubscription}>
            <List.Content>Enable subscription</List.Content>
          </List.Item>
        )}

        {redemptionAllowed ? (
          <List.Item as="a" onClick={toggleRedemption}>
            <List.Content>Disable redemption in MLN</List.Content>
          </List.Item>
        ) : (
          <List.Item as="a" onClick={toggleRedemption}>
            <List.Content>Enable redemption in MLN</List.Content>
          </List.Item>
        )}

        <List.Item as="a" onClick={convertUnclaimedRewards}>
          <List.Content>Convert unclaimed rewards: 0 MLN</List.Content>
        </List.Item>
        <List.Item as="a" onClick={shutdown}>
          <List.Content>Irreversibly shut down fund</List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">
        Please wait for upcoming Metamask popup
      </div>
    </div>
  </Card>
);

export default Administration;
