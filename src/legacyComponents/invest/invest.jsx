import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Invest = props => (
  <div>
    <Card centered style={{ marginTop: '2em'}}>

      <Card.Content>
        <Card.Header>Invest MLN in {props.fundName}</Card.Header>
        <br />
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


        <Button basic color="black" onClick={props.onInvest} style={{ width: '100%'}}>
              Invest
            </Button>

      </Card.Content>
      <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">Investing in your fund ...</div>
      </div>
    </Card>
  </div>

);

export default Invest;
