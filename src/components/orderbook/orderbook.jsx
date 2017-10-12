import React from "react";
import BigNumber from "bignumber.js";
import { Table, Grid } from "semantic-ui-react";

const getSellGradient = (cumulativeVolume, totalVolume) => {
  const percentage = new BigNumber(cumulativeVolume).div(totalVolume).times(100);
  const reverse = new BigNumber(100).minus(percentage);
  return {
    background: `linear-gradient(to right, rgba(201, 88, 88,0) 0%, rgba(201, 88, 88,0) ${reverse}%, rgba(201, 88, 88,0.3) ${reverse}%, rgba(201, 88, 88,0.3) 100%)`
  }
}

const getBuyGradient = (cumulativeVolume, totalVolume) => {
  const percentage = new BigNumber(cumulativeVolume).div(totalVolume).times(100);
  return {
    background: `linear-gradient(to right, rgba(71, 161, 71,0.3) 0%, rgba(71, 161, 71,0.3) ${percentage}%, rgba(71, 161, 71,0) ${percentage}%, rgba(71, 161, 71,0) 100%)`
  }
}

const onMouseOver = (e) => {
  e.currentTarget.style.backgroundColor = 'rgb(240, 240, 240)';
}

const onMouseOut = (e) => {
  e.currentTarget.style.backgroundColor = 'initial';
}

const OrderBook = props => (
  <div id="orderbook">
    <h3 className="App-intro">Orderbook for {props.assetPair}</h3>
    <Grid padded={false}>
      <Grid.Row columns={2}>
        <Grid.Column style={{paddingRight: 0}}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
                <Table.HeaderCell>Vol.</Table.HeaderCell>
                <Table.HeaderCell>Bid</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{ cursor: "pointer" }}>
              {props.buyOrders.map((order, i) => (
                <Table.Row
                  key={i}
                  onClick={() => props.onClick(order)}
                  style={getSellGradient(order.cumulativeVolume, props.totalSellVolume)}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                >
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
        </Grid.Column>
        <Grid.Column  style={{paddingLeft: 0, marginLeft: -1}}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Ask</Table.HeaderCell>
                <Table.HeaderCell>Vol.</Table.HeaderCell>
                <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{ cursor: "pointer" }}>
              {props.sellOrders.map((order, i) => (
                <Table.Row
                  key={i}
                  onClick={() => props.onClick(order)}
                  style={getBuyGradient(order.cumulativeVolume, props.totalBuyVolume)}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                >
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default OrderBook;



