import React from "react";
import { Table } from "semantic-ui-react";

const Ranking = ({ rankingList }) => (
  <div>
    <h3 id="history" className="App-intro">
      RANKING TABLE
    </h3>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Share price</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Inception date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rankingList.map((fund, i) => (
          <Table.Row key={i + 1}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>{fund.name}</Table.Cell>
            <Table.Cell textAlign="right">{fund.sharePrice}</Table.Cell>
            <Table.Cell textAlign="right">{fund.inception}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default Ranking;
