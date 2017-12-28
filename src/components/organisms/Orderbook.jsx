import React from "react";
import BigNumber from "bignumber.js";
import { Table, Grid } from "semantic-ui-react";

const getSellGradient = (cumulativeVolume, totalVolume) => {
  const percentage = new BigNumber(cumulativeVolume)
    .div(totalVolume)
    .times(100);
  const reverse = new BigNumber(100).minus(percentage);
  return {
    background: `linear-gradient(to right, rgba(201, 88, 88,0) 0%, rgba(201, 88, 88,0) ${reverse}%, rgba(201, 88, 88,0.3) ${reverse}%, rgba(201, 88, 88,0.3) 100%)`,
  };
};

const getBuyGradient = (cumulativeVolume, totalVolume) => {
  const percentage = new BigNumber(cumulativeVolume)
    .div(totalVolume)
    .times(100);
  return {
    background: `linear-gradient(to right, rgba(71, 161, 71,0.3) 0%, rgba(71, 161, 71,0.3) ${percentage}%, rgba(71, 161, 71,0) ${percentage}%, rgba(71, 161, 71,0) 100%)`,
  };
};

const onMouseOver = e => {
  e.currentTarget.style.backgroundColor = "rgb(240, 240, 240)";
};

const onMouseOut = e => {
  e.currentTarget.style.backgroundColor = "initial";
};

const Orderbook = ({
  buyOrders,
  sellOrders,
  totalSellVolume,
  totalBuyVolume,
  baseTokenSymbol,
  quoteTokenSymbol,
  onClick,
}) => (
  <div id="orderbook">
    <h3 className="App-intro">
      Orderbook for {baseTokenSymbol}/{quoteTokenSymbol}
    </h3>
    <Grid padded={false}>
      <Grid.Row columns={2}>
        <Grid.Column style={{ paddingRight: 0 }}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ textAlign: "right" }}>
                  Cum. Vol.
                </Table.HeaderCell>
                <Table.HeaderCell style={{ textAlign: "right" }}>
                  Vol.
                </Table.HeaderCell>
                <Table.HeaderCell style={{ textAlign: "right" }}>
                  Bid
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{ cursor: "pointer" }}>
              {buyOrders.map(order => (
                <Table.Row
                  key={order.id}
                  style={getSellGradient(
                    order.cumulativeVolume,
                    totalSellVolume,
                  )}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  onClick={() => onClick(order.id)}
                >
                  <Table.Cell style={{ textAlign: "right" }}>
                    {order.cumulativeVolume}
                  </Table.Cell>
                  <Table.Cell style={{ textAlign: "right" }}>
                    {order.howMuch}
                  </Table.Cell>
                  <Table.Cell style={{ textAlign: "right" }}>
                    {order.price}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column style={{ paddingLeft: 0, marginLeft: -1 }}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>&nbsp;&nbsp;&nbsp;&nbsp;Ask</Table.HeaderCell>
                <Table.HeaderCell>Vol.</Table.HeaderCell>
                <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{ cursor: "pointer" }}>
              {sellOrders.map(order => (
                <Table.Row
                  key={order.id}
                  style={getBuyGradient(order.cumulativeVolume, totalBuyVolume)}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  onClick={() => onClick(order.id)}
                >
                  <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp;{order.price}</Table.Cell>
                  <Table.Cell>{order.howMuch}</Table.Cell>
                  <Table.Cell>{order.cumulativeVolume}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Orderbook;
