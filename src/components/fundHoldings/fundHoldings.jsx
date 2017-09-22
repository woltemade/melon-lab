import React from "react";
import { Table } from "semantic-ui-react";

const FundHoldings = props => (
  <div id="holdings">
    <p className="App-intro">Fund Holdings</p>
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
        {props.assets.map((asset, i) => (
          <Table.Row key={i}>
            <Table.Cell>{asset}</Table.Cell>
            <Table.Cell>{props[asset]}</Table.Cell>
            <Table.Cell>{props[asset] / props.aum * 100}</Table.Cell>
            <Table.Cell>{props[`${asset}_PRICE`]}</Table.Cell>
            <Table.Cell onClick={() => props.onClick(asset)}>
              <a href="#trade">Buy/Sell</a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default FundHoldings;
