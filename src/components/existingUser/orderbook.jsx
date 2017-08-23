import React from "react";
import { Table } from "semantic-ui-react";

const OrderBook = props =>
  (<div>
    <p className="App-intro">Orderbook for MLN/ETH</p>
    {/* <strong>
      {props.onRequest("ETH-T/MLN-T")}
    </strong> */}
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
          <Table.HeaderCell>Vol.</Table.HeaderCell>
          <Table.HeaderCell>Bid</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.buyOrders.map((order, i) =>
          (<Table.Row key={i}>
            <Table.Cell>CUM VOL</Table.Cell>
            <Table.Cell>4.4137</Table.Cell>
            <Table.Cell>
              {order.buyPrice}
            </Table.Cell>
          </Table.Row>),
        )}
      </Table.Body>
    </Table>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
          <Table.HeaderCell>Vol.</Table.HeaderCell>
          <Table.HeaderCell>Bid</Table.HeaderCell>
          <Table.HeaderCell>Ask</Table.HeaderCell>
          <Table.HeaderCell>Vol.</Table.HeaderCell>
          <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>4.3744</Table.Cell>
          <Table.Cell>4.3744</Table.Cell>
          <Table.Cell>0.2286</Table.Cell>
          <Table.Cell>0.2291</Table.Cell>
          <Table.Cell>4.3656</Table.Cell>
          <Table.Cell>4.3656</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>8.7881</Table.Cell>
          <Table.Cell>4.4137</Table.Cell>
          <Table.Cell>0.2266</Table.Cell>
          <Table.Cell>0.2311</Table.Cell>
          <Table.Cell>4.3263</Table.Cell>
          <Table.Cell>8.6920</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>13.2194</Table.Cell>
          <Table.Cell>4.4312</Table.Cell>
          <Table.Cell>0.2257</Table.Cell>
          <Table.Cell>0.2321</Table.Cell>
          <Table.Cell>4.3089</Table.Cell>
          <Table.Cell>13.0009</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>);

export default OrderBook;
