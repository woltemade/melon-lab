import React from "react";
import { List, Card, Icon, Button } from "semantic-ui-react";

const FundActivity = () =>
  (<Card centered>
    <Card.Content>
      <Card.Header>Fund Activity</Card.Header>
      <br />
      <Card.Meta />
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Recent Subscriptions</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Recent Redemptions</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black">
          Request full subscriptions/redeem history
        </Button>
      </div>
      <br />
      <br />
      <br />
      <div className="ui two buttons">
        <Button basic color="black" href="#investredeem">
          Invest
        </Button>
        <Button basic color="black" href="#investredeem">
          Redeem
        </Button>
      </div>
    </Card.Content>
  </Card>);

export default FundActivity;
