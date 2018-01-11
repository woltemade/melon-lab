import React from "react";
import { Field } from "redux-form";
import { Image, Table } from "semantic-ui-react";
import Link from "redux-first-router-link";
import Highlight from "react-highlighter";
import GetStarted from "../../containers/GetStarted";

import renderInput from "../utils/renderInput";

const Ranking = ({
  rankingList,
  getFundLinkAction,
  loading,
  usersFund,
  search,
  onFilterChange,
}) => (
  <div>
    <GetStarted />

    <h2 id="history" className="App-intro">
      Melon Funds Ranking
    </h2>

    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>
            <form id="ranking-search">
              <Field
                onChange={onFilterChange}
                className="left-input"
                name="search"
                component={renderInput}
                style={{ width: 200 }}
              />
            </form>
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Share price</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Inception date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rankingList.map(fund => (
          <Table.Row
            key={fund.address}
            style={{
              backgroundColor:
                usersFund === fund.address ? "rgba(0,0,0,0.05)" : "transparent",
            }}
          >
            <Table.Cell>{fund.rank}</Table.Cell>
            <Table.Cell>
              <Link to={getFundLinkAction(fund.address)}>
                <Highlight search={search}>{fund.name}</Highlight>
              </Link>
            </Table.Cell>
            <Table.Cell textAlign="right">{fund.sharePrice}</Table.Cell>
            <Table.Cell textAlign="right">{fund.inception}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    {loading ? (
      <div>
        <Image src="./melon-spinner.gif" size="small" centered />
      </div>
    ) : (
      <div />
    )}
  </div>
);

export default Ranking;
