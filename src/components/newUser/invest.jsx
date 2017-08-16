import React from "react";
import { List, Input, Button, Card } from "semantic-ui-react";

const Invest = props =>
  (<div>
    <div className="ui segment">
      <br />
      <p className="App-intro">Now, time to invest in your fund!</p>
      <div className={props.dimmerClass}>
        <div className="ui text loader">
          Deploying your fund to the Ethereum blockchain
        </div>
      </div>
      <Card centered>
        <Card.Content>
          <Card.Header>Invest</Card.Header>
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
              Invest
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  </div>);

export default Invest;
