import { connect } from 'react-redux';
import { compose } from 'recompose';
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

const subscription = gql`
  subscription OrderbookQuery($baseToken: String!, $quoteToken: String!) {
    orderbook(baseTokenAddress: $baseToken, quoteTokenAddress: $quoteToken) {
      type
      price
      exchange
      cumulativeVolume
    }
  }
`;

// @TODO: Why is the "empty" value for this "..."?
const withState = connect(state => ({
  baseToken: state.app.assetPair.base,
  quoteToken: state.app.assetPair.quote,
  state: state,
}));

const withSubscription = BaseComponent => baseProps => (
  <Subscription
    subscription={subscription}
    variables={{
      baseToken: baseProps.baseToken,
      quoteToken: baseProps.quoteToken,
    }}
    skip={baseProps.baseToken === '...' || baseProps.quoteToken === '...'}
  >
    {props => (
      <BaseComponent
        {...baseProps}
        orderbook={props.data && props.data.orderbook}
        loading={props.loading}
      />
    )}
  </Subscription>
);

export default compose(withState, withSubscription)(Orderbook);
