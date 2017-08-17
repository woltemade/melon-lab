import React from "react";
import { Table } from "semantic-ui-react";

const RecentTrades = () =>
  (<div>
    <p className="App-intro">Recent trades for MLN/ETH</p>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Price (MLN/XBT)</Table.HeaderCell>
          <Table.HeaderCell>Amount (XBT)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>10.8.2017 15:42:44</Table.Cell>
          <Table.Cell>buy</Table.Cell>
          <Table.Cell>0.1120</Table.Cell>
          <Table.Cell>0.2291</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>10.8.2017 04:15:44</Table.Cell>
          <Table.Cell>buy</Table.Cell>
          <Table.Cell>0.1090</Table.Cell>
          <Table.Cell>7.7000</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>10.8.2017 04:14:43</Table.Cell>
          <Table.Cell>sell</Table.Cell>
          <Table.Cell>0.1070</Table.Cell>
          <Table.Cell>0.7007</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>);

export default RecentTrades;
