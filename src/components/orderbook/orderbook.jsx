import React from "react";
import BigNumber from "bignumber.js";
import { Table } from "semantic-ui-react";

const OrderBook = props => (
  <div id="orderbook">
    <p className="App-intro">Orderbook for {props.assetPair}</p>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
          <Table.HeaderCell>Vol.</Table.HeaderCell>
          <Table.HeaderCell>Bid</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body style={{ cursor: "pointer" }}>
        {props.buyOrders.map((order, i) => (
          <Table.Row key={i} onClick={() => props.onClick(order)}>
            <Table.Cell>
              {new BigNumber(order.cumulativeVolume).toFixed(4)}
            </Table.Cell>
            <Table.Cell>
              {new BigNumber(order.buy.howMuch).toFixed(4)}
            </Table.Cell>
            <Table.Cell>{new BigNumber(order.price).toFixed(4)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ask</Table.HeaderCell>
          <Table.HeaderCell>Vol.</Table.HeaderCell>
          <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body style={{ cursor: "pointer" }}>
        {props.sellOrders.map((order, i) => (
          <Table.Row key={i} onClick={() => props.onClick(order)}>
            <Table.Cell>{new BigNumber(order.price).toFixed(4)}</Table.Cell>
            <Table.Cell>
              {new BigNumber(order.sell.howMuch).toFixed(4)}
            </Table.Cell>
            <Table.Cell>
              {new BigNumber(order.cumulativeVolume).toFixed(4)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default OrderBook;
