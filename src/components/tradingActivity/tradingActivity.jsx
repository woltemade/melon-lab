import React from "react";
import { List, Card, Icon, Button } from "semantic-ui-react";

const TradingActivity = () =>
  (<Card centered>
    <Card.Content>
      <Card.Header>Trading activity</Card.Header>
      <br />
      <Card.Meta />
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Open orders</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Executed orders (since last visit)</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black">
          Request full trading history
        </Button>
      </div>
    </Card.Content>
  </Card>);

export default TradingActivity;
