import React from "react";
import { List, Card, Icon, Button, Table } from "semantic-ui-react";

const TradingActivity = props => (
  <div>
    <p className="App-intro">Fund trading activity</p>

    <Table celled>
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
    {/* <div className="ui two buttons">
      <Button basic color="black">
        Request full trading history
      </Button>
    </div> */}
  </div>
);

export default TradingActivity;
