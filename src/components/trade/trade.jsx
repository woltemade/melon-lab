import React from "react";
import { List, Input, Button, Card, Image } from "semantic-ui-react";

const Trade = props => (
  <Card centered id="trade">
    <Card.Content>
      <Card.Header>Place an order</Card.Header>
      <br />
      <br />

      <div
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={props.onSwitch}
      >
        <Card.Meta>
          {props.orderType} <strong>{props.baseTokenSymbol}</strong>
        </Card.Meta>
        <Image
          src="./switch.svg"
          width="18em"
          centered
          style={{ cursor: "pointer" }}
        />

        <Card.Meta>
          {props.theirOrderType} <strong>{props.quoteTokenSymbol}</strong>
        </Card.Meta>
      </div>

      <br />
      <List>
        <List.Item as="a">
          <List.Content>
            <Input
              label="Price"
              name="price"
              placeholder=""
              value={props.price}
              onChange={props.onChange}
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
            />
          </List.Content>
        </List.Item>
      </List>

      <Button
        basic
        color="black"
        onClick={props.placeOrder}
        style={{ width: "100%" }}
      >
        {props.orderType}
      </Button>
    </Card.Content>
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Executing your order ...</div>
    </div>
  </Card>
);

export default Trade;
