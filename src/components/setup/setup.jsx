import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Setup = props => (
  <div>
    <h2>Welcome to the future of investment funds</h2>
    <div className="ui segment">
      <p className="App-intro">To get started, let's create your Melon fund.</p>
      <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">
          Deploying your fund to the Ethereum blockchain
        </div>
      </div>
      <Card centered>
        <Card.Content>
          <Card.Header>Setup your fund</Card.Header>
          <br />
          <List>
            <List.Item as="a">
              <List.Content>
                <Input
                  name="name"
                  placeholder={props.name}
                  onChange={props.onChange}
                />
              </List.Content>
            </List.Item>
            <br />
            <br />
            <p>Default Configuration</p>
            <List.Item as="a">
              <List.Content>
                <Input
                  readOnly
                  name="managementFee"
                  placeholder={props.managementFee}
                  onChange={props.onChange}
                />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input
                  readOnly
                  name="performanceFee"
                  placeholder={props.performanceFee}
                  onChange={props.onChange}
                />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input
                  readOnly
                  placeholder="Exchange: OasisDex implementation"
                />
              </List.Content>
            </List.Item>
            <List.Item as="a">
              <List.Content>
                <Input readOnly placeholder="DataFeed: Melon Datafeed" />
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="black" onClick={props.onCreate}>
              Create and deploy my fund!
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  </div>
);

export default Setup;
