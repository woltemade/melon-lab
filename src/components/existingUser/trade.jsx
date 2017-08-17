import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Trade = () =>
  (<Card centered>
    <Card.Content>
      <Card.Header>Place an order</Card.Header>
      <br />
      <br />
      <Card.Meta>
        Buy <strong>XBT</strong>
      </Card.Meta>
      <i className="shuffle icon" />

      <Card.Meta>
        Sell <strong>MLN</strong>
      </Card.Meta>
      <br />
      <List>
        <List.Item as="a">
          <List.Content>
            <Input placeholder="Amount" />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input placeholder="Price" />
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
          Buy
        </Button>
      </div>
    </Card.Content>
  </Card>);

export default Trade;
