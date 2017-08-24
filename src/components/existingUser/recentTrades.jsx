import React from "react";
import { Table } from "semantic-ui-react";

const RecentTrades = props =>
  (<div>
    <p className="App-intro">
      Recent trades for {props.assetPair}
    </p>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Price (MLN/ETH)</Table.HeaderCell>
          <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.recentTrades.map((trade, i) =>
          (<Table.Row key={i}>
            <Table.Cell>TIME PLACEHOLDER</Table.Cell>
            <Table.Cell>
              {trade.type}
            </Table.Cell>
            <Table.Cell>
              {trade.price}
            </Table.Cell>
            <Table.Cell>
              {trade.quantity}
            </Table.Cell>
          </Table.Row>),
        )}
      </Table.Body>
    </Table>
  </div>);

export default RecentTrades;
