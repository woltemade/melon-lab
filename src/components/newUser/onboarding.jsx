import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Onboarding = () =>
  (<div>
    <h2>Welcome to the Melon Protocol.</h2>
    <p className="App-intro">To get started, let's create your Melon fund.</p>
    <Card.Group>
      <Card centered>
        <Card.Content>
          <Card.Header>Setup your fund</Card.Header>
          <br />
          <List>
            <List.Item as="a">
              <List.Content>
                <Input placeholder="Fund Name" />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input placeholder="Management Fee" />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input placeholder="Performance Fee" />
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="black">
              Create and deploy my fund!
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card centered>
        <Card.Content>
          <Card.Header>Invest</Card.Header>
          <br />
          <List>
            <List.Item as="a">
              <List.Content>
                <Input placeholder="Amount" />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input placeholder="Price per share" />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input placeholder="Total" />
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="black">
              Invest
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  </div>);

export default Onboarding;
