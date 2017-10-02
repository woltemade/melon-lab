import React from "react";
import { List, Input, Button, Card, Menu } from "semantic-ui-react";

const Participation = props => (
  <Card centered id="investredeem">
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Processing transaction ...</div>
    </div>
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
              placeholder={props.amount}
              onChange={props.onChange}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              readOnly
              name="price"
              value={props.price}
              onChange={props.onChange}
              label="Share Price"
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
        <Button basic color="black" onClick={() => props.onSubmit()}>
          Submit request
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default Participation;
