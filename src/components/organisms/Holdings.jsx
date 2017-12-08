import React from "react";
import BigNumber from "bignumber.js";

import { Table } from "semantic-ui-react";

const FundHoldings = ({ holdings, selectAsset }) => (
  <div id="holdings">
    <h3 className="App-intro">Fund Holdings</h3>
    <Table size={"small"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Quantity</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">% of portfolio</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Price (MLN)</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Trade</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {holdings.map(asset => (
          <Table.Row key={asset.name}>
            <Table.Cell>{asset.name}</Table.Cell>
            <Table.Cell textAlign="right">{asset.balance}</Table.Cell>
            <Table.Cell textAlign="right">{asset.percentage}%</Table.Cell>
            <Table.Cell textAlign="right">{asset.price}</Table.Cell>
            <Table.Cell
              textAlign="right"
              onClick={() => selectAsset(asset.name)}
            >
              {asset[0] === "MLN-T" ? (
                <div>❤</div>
              ) : (
                <div className="interactive">Buy/Sell</div>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default FundHoldings;
