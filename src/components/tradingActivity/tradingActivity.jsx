import React from "react";
import BigNumber from "bignumber.js";
import { Table } from "semantic-ui-react";

const TradingActivity = props => (
  <div>
    <h3 className="App-intro">Fund trading activity</h3>

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
            <Table.Cell>{trade.type}</Table.Cell>
            <Table.Cell>{new BigNumber(trade.price).toFixed(4)}</Table.Cell>
            <Table.Cell>{trade.buyToken}</Table.Cell>
            <Table.Cell>{trade.sellToken}</Table.Cell>
            <Table.Cell>{new BigNumber(trade.quantity).toFixed(4)}</Table.Cell>
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
