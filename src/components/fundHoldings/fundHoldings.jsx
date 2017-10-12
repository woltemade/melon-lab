import React from "react";
import BigNumber from "bignumber.js";

import { Table } from "semantic-ui-react";

const FundHoldings = props => (
  <div id="holdings">
    <h3 className="App-intro">Fund Holdings</h3>
    <Table size={"small"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Quantity</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>% of portfolio</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Price (MLN)</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Trade</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.assets.map((asset, i) => (
          <Table.Row key={i}>
            <Table.Cell>{asset}</Table.Cell>
            <Table.Cell textAlign='right'>{props[asset]}</Table.Cell>
            <Table.Cell textAlign='right'>
              {new BigNumber(
                (props[asset] *
                  props[`${asset}_PRICE`] /
                  props.aum *
                  100).toFixed(4),
              ).toFixed(4)}
            </Table.Cell>
            <Table.Cell textAlign='right'>{props[`${asset}_PRICE`]}</Table.Cell>
            <Table.Cell textAlign='right' onClick={() => props.onClick(asset)}>
              {i === 0 ? <div>❤</div> : <a href="#trade">Buy/Sell</a>}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default FundHoldings;
