import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Trade = props =>
  (<Card centered>
    <Card.Content>
      <Card.Header>Place an order</Card.Header>
      <br />
      <br />
      <Card.Meta>
        {props.orderType} <strong>{props.baseTokenSymbol}</strong>
      </Card.Meta>
      <i className="shuffle icon" />

      <Card.Meta>
        {props.theirOrderType} <strong>{props.quoteTokenSymbol}</strong>
      </Card.Meta>
      <br />
      <List>
        <List.Item as="a">
          <List.Content>
            <Input
              readOnly
              label="Price"
              name="price"
              placeholder=""
              value={props.price}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              label="Quantity"
              name="amount"
              placeholder=""
              value={props.amount}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              label="Total"
              name="total"
              placeholder=""
              value={props.total}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black" onClick={props.placeOrder}>
          {props.orderType}
        </Button>
      </div>
    </Card.Content>
  </Card>);

export default Trade;
