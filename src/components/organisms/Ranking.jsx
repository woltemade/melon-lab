import React from "react";
import { Table } from "semantic-ui-react";
import Link from "redux-first-router-link";
import GetStarted from "./GetStarted";

const Ranking = ({ rankingList, getFundLinkAction }) => (
  <div>
    <GetStarted />
    <h2 id="history" className="App-intro">
      Melon Funds Ranking
    </h2>
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
            <Table.Cell>
              <Link to={getFundLinkAction(fund.address)}>{fund.name}</Link>
            </Table.Cell>
            <Table.Cell textAlign="right">{fund.sharePrice}</Table.Cell>
            <Table.Cell textAlign="right">{fund.inception}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default Ranking;
