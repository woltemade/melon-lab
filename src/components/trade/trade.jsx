import React from "react";
import { List, Input, Button, Card, Image } from "semantic-ui-react";

const Trade = props => (
  <Card centered id="trade">
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Executing your order ...</div>
    </div>
    <Card.Content>
      <Card.Header>Place an order</Card.Header>
      <br />
      <br />

      <div style={{ textAlign: 'center', cursor: 'pointer'}} onClick={() => console.log('switch')}>
        <Card.Meta>
          {props.orderType} <strong>{props.baseTokenSymbol}</strong>
        </Card.Meta>
        <Image src="./switch.svg" width="18em" centered />

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
              style={{width: '100%'}}
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
              style={{width: '100%'}}
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
              style={{width: '100%'}}
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
  </Card>
);

export default Trade;
