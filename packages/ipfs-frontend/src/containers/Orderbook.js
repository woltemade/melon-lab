// import { connect } from "react-redux";
// import { lifecycle } from "recompose";
// import { actions } from "../actions/orderbook";
// import displayNumber from "../utils/displayNumber";

import Orderbook from '../components/organisms/Orderbook';
import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

// const mapStateToProps = state => ({
//   ...state.orderbook,
//   buyOrders: state.orderbook.buyOrders.map(order => ({
//     id: order.id,
//     price: displayNumber(order.price),
//     cumulativeVolume: displayNumber(order.cumulativeVolume),
//     howMuch: displayNumber(order.buy.howMuch),
//   })),
//   sellOrders: state.orderbook.sellOrders.map(order => ({
//     id: order.id,
//     price: displayNumber(order.price),
//     cumulativeVolume: displayNumber(order.cumulativeVolume),
//     howMuch: displayNumber(order.sell.howMuch),
//   })),
//   totalBuyVolume: displayNumber(state.orderbook.totalBuyVolume),
//   totalSellVolume: displayNumber(state.orderbook.totalSellVolume),
//   baseTokenSymbol: state.app.assetPair.base,
//   quoteTokenSymbol: state.app.assetPair.quote,
//   isReadyToTrade: state.app.isReadyToTrade,
//   loading: state.orderbook.loading,
// });

// const mapDispatchToProps = dispatch => ({
//   getOrderbook: () => {
//     dispatch(actions.getOrderbook());
//   },
//   onClick: orderId => {
//     dispatch(actions.selectOrder(orderId));
//   },
// });

// const OrderbookLifecycle = lifecycle({
//   componentDidMount() {
//     this.props.getOrderbook();
//   },
// })(Orderbook);

// const OrderbookContainer = connect(mapStateToProps, mapDispatchToProps)(
//   OrderbookLifecycle,
// );

const query = gql`
  subscription PriceQuery($symbol: Symbol!) {
    price(symbol: $symbol)
  }
`;

const OrderbookContainer = BaseComponent => baseProps => (
  <Subscription subscription={query} variables={{ symbol: 'ETH-T-M' }}>
    {props => (
      <BaseComponent {...baseProps} data={props.data} loading={props.loading} />
    )}
  </Subscription>
);

export default OrderbookContainer(Orderbook);
