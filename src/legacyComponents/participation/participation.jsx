import React from "react";
import { List, Input, Button, Card, Menu } from "semantic-ui-react";

const Participation = props => (
  <Card id="participation">
    <Card.Content>
      <Card.Header>Participation</Card.Header>
      <div>
        <Menu text style={{ display: 'flex', justifyContent: 'center'}}>
          <Menu.Item
            name="Invest"
            active={props.participationType === "Invest"}
            onClick={props.onSelect}
          />
          <div style={{marginTop: '0.7em'}}>|</div>
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

      <Button basic color="black" onClick={() => props.onSubmit()} style={{ width: '100%'}}>
        Submit request
      </Button>

    </Card.Content>
    <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Processing transaction ...</div>
    </div>
  </Card>
);

export default Participation;
