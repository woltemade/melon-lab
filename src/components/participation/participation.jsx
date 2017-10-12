import React from "react";
import { List, Input, Button, Card, Menu } from "semantic-ui-react";

const Participation = props => (
  <Card id="participation">
    <Card.Content>
      <Card.Header>Participation</Card.Header>
      <br />
      <div>
        <Menu text>
          <Menu.Item
            name="Invest"
            active={props.participationType === "Invest"}
            onClick={props.onSelect}
          />
          <Menu.Item
            name="Redeem"
            active={props.participationType === "Redeem"}
            onClick={props.onSelect}
          />
        </Menu>
      </div>
      <List>
        <List.Item as="a">
          <List.Content>
            <Input
              name="amount"
              placeholder="Amount"
              value={props.amount}
              onChange={props.onChange}
              label="Amount"
              style={{width: '100%'}}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              readOnly
              name="price"
              value={props.price}
              label="Share Price"
              style={{width: '100%'}}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              name="total"
              placeholder="Total"
              value={props.total}
              onChange={props.onChange}
              label="Total"
              style={{width: '100%'}}
            />
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black" onClick={() => props.onSubmit()}>
          Submit request
        </Button>
      </div>
    </Card.Content>
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Processing transaction ...</div>
    </div>
  </Card>
);

export default Participation;
