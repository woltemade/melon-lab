import React from "react";
import BigNumber from "bignumber.js";
import { Table } from "semantic-ui-react";

const RecentTrades = props => (
  <div>
    <p className="App-intro">Recent trades for {props.assetPair}</p>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>
            Price ({props.quoteTokenSymbol}/{props.baseTokenSymbol})
          </Table.HeaderCell>
          <Table.HeaderCell>Amount ({props.baseTokenSymbol})</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.recentTrades.map((trade, i) => (
          <Table.Row key={i}>
            <Table.Cell>{trade.timestamp}</Table.Cell>
            <Table.Cell>{trade.type}</Table.Cell>
            <Table.Cell>{new BigNumber(trade.price).toFixed(4)}</Table.Cell>
            <Table.Cell>{new BigNumber(trade.quantity).toFixed(4)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default RecentTrades;
