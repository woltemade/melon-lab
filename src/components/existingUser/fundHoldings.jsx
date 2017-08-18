import React from "react";
import { Table } from "semantic-ui-react";

const FundHoldings = props =>
  (<div>
    <p className="App-intro">Fund Holdings</p>
    <strong>
      {props.onRequest()}
    </strong>
    <Table celled size={"small"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>% of portfolio</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Trade</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>MLN</Table.Cell>
          <Table.Cell>207</Table.Cell>
          <Table.Cell>29.57</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>ETH</Table.Cell>
          <Table.Cell>124</Table.Cell>
          <Table.Cell>70.43</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>DOT</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>XBT</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>EUR</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>REP</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>SNT</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>XRP</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>DGD</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>Buy/Sell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>);

export default FundHoldings;
