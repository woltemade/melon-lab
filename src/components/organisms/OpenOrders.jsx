import React from "react";
import { Table } from "semantic-ui-react";

const OpenOrders = ({ openOrders }) => (
  <div>
    <h3 id="history" className="App-intro">
      Open orders
    </h3>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Order id</Table.HeaderCell>
          <Table.HeaderCell>Order type</Table.HeaderCell>
          <Table.HeaderCell>Buy</Table.HeaderCell>
          <Table.HeaderCell>Sell</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Price</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Buy Quantity</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Sell Quantity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {openOrders.map((order, i) => (
          <Table.Row key={i}>
            <Table.Cell>{order.timestamp}</Table.Cell>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>{order.type}</Table.Cell>
            <Table.Cell>{order.buySymbol}</Table.Cell>
            <Table.Cell>{order.sellSymbol}</Table.Cell>
            <Table.Cell textAlign="right">{order.price}</Table.Cell>
            <Table.Cell textAlign="right">{order.buyHowMuch}</Table.Cell>
            <Table.Cell textAlign="right">{order.sellHowMuch}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default OpenOrders;
