import React from "react";
import { List, Card, Button } from "semantic-ui-react";

const FundActivity = ({
  requestFullParticipationHistory,
  /*
  subscriptions,
  redemptions,
  */
}) => (
  <Card centered>
    <Card.Content>
      <Card.Header>Fund Activity</Card.Header>
      <br />
      <Card.Meta />
      <br />
      <List>
        <List.Item as="a">
          <List.Content>
            <List.Header>Recent Subscriptions</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <List.Header>Recent Redemptions</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black" onClick={requestFullParticipationHistory}>
          Request full subscriptions/redeem history
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default FundActivity;
