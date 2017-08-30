import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Participation = props =>
  (<Card centered id="investredeem">
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Investing in your fund ...</div>
    </div>
    <Card.Content>
      <Card.Header>Invest / Redeem</Card.Header>
      <br />
      <List>
        <List.Item as="a">
          <List.Content>
            <Input
              name="amount"
              placeholder={props.amount}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              name="price"
              placeholder={props.price}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              name="total"
              placeholder={props.total}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black" onClick={props.onInvest}>
          Invest / Redeem
        </Button>
      </div>
    </Card.Content>
  </Card>);

export default Participation;
