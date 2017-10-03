import React from "react";
import { List, Card, Icon, Button, Table } from "semantic-ui-react";

const TradingActivity = props => (
  <Card centered>
    <Card.Content>
      <Card.Header>Fund trading activity</Card.Header>
      <br />
      <Card.Meta />
      <br />

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Buy</Table.HeaderCell>
            <Table.HeaderCell>Sell</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.fundRecentTrades.map((trade, i) => (
            <Table.Row key={i}>
              <Table.Cell>{trade.timestamp}</Table.Cell>
              <Table.Cell>{trade.ourOrderType}</Table.Cell>
              <Table.Cell>{trade.buyToken}</Table.Cell>
              <Table.Cell>{trade.sellToken}</Table.Cell>
              <Table.Cell>{trade.price}</Table.Cell>
              <Table.Cell>{trade.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="black">
          Request full trading history
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default TradingActivity;
