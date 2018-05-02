import React from 'react';
import { Table } from 'semantic-ui-react';

const RecentTrades = ({ baseTokenSymbol, quoteTokenSymbol, trades }) => (
  <div>
    <h3 id="history" className="App-intro">
      Recent trades for {baseTokenSymbol}/{quoteTokenSymbol}
    </h3>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">
            Price ({baseTokenSymbol}/{quoteTokenSymbol})
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="right">
            Amount ({baseTokenSymbol})
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {trades.map((trade, index) => (
          <Table.Row key={index}>
            <Table.Cell>{trade.timestamp}</Table.Cell>
            <Table.Cell>{trade.type}</Table.Cell>
            <Table.Cell textAlign="right">{trade.price}</Table.Cell>
            <Table.Cell textAlign="right">{trade.quantity}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default RecentTrades;
