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
            <List.Header>Enable/Refuse subscription in MLN</List.Header>
          </List.Content>
        </List.Item>

        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Enable/Refuse redemption in MLN</List.Header>
          </List.Content>
        </List.Item>

        <List.Item as="a">
          <Icon name="right triangle" />
          <List.Content>
            <List.Header>Convert unclaimed rewards: 0 MLN</List.Header>
          </List.Content>
        </List.Item>
        <List.Item as="a">
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
