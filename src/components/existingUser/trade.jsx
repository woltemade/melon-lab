import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Trade = props =>
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
            <Input name="price" placeholder="Price" value={props.price} />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input name="amount" placeholder="Amount" value={props.amount} />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input name="total" placeholder="Total" value={props.total} />
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
