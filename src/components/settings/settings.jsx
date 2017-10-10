import React from "react";
import { List, Card, Icon } from "semantic-ui-react";

const Settings = () => (
  <Card centered id="settings">
    <Card.Content>
      <Card.Header>Settings</Card.Header>
      <br />
      <br />
      <br />
      <List>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Claim rewards: 0 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Shut down fund</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default Settings;
