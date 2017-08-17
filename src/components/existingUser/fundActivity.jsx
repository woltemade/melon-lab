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
            <List.Header>Recent Investments</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Recent Redeemals</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black">
          Request full invest/redeem history
        </Button>
      </div>
      <br />
      <br />
      <br />
      <div className="ui two buttons">
        <Button basic color="black">
          Invest
        </Button>
        <Button basic color="black">
          Redeem
        </Button>
      </div>
    </Card.Content>
  </Card>);

export default FundActivity;
