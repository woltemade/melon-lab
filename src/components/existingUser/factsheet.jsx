import React from "react";
import { List, Card, Icon, Divider } from "semantic-ui-react";

const Factsheet = () =>
  (<Card centered>
    <Card.Content>
      <Card.Header>
        <strong>μέλλω Capital </strong>
      </Card.Header>
      <br />
      <Card.Meta>
        - Actively managed portfolio with <strong>crypto only</strong> exposure
        -
      </Card.Meta>
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Inception date: 07/07/2017</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>AUM: 700 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Share Price: 2,007</List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Management fees: 2%</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Performance fees: 5%</List.Header>
          </List.Content>
        </List.Item>
        <Divider />
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Unclaimed rewards: 7 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Settings</List.Header>
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
  </Card>);

export default Factsheet;
