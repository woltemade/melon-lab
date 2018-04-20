import React from 'react';
import BigNumber from 'bignumber.js';
import { Grid, Image } from 'semantic-ui-react';

const getBuyRowStyle = (
  cumulativeVolume,
  totalVolume,
  isReadyToTrade,
  isLast,
) => {
  const percentage = new BigNumber(cumulativeVolume)
    .div(totalVolume)
    .times(100);
  const reverse = new BigNumber(100).minus(percentage);
  return {
    background: `linear-gradient(to right, rgba(201, 88, 88,0) 0%, rgba(201, 88, 88,0) ${reverse}%, rgba(201, 88, 88,0.3) ${reverse}%, rgba(201, 88, 88,0.3) 100%)`,
    cursor: isReadyToTrade ? 'pointer' : 'auto',
    padding: 0,
    borderBottom: isLast ? 'none' : '1px solid rgba(34, 36, 38, 0.15)',
  };
};

const getSellRowStyle = (
  cumulativeVolume,
  totalVolume,
  isReadyToTrade,
  isLast,
) => {
  const percentage = new BigNumber(cumulativeVolume)
    .div(totalVolume)
    .times(100);
  return {
    background: `linear-gradient(to right, rgba(71, 161, 71,0.3) 0%, rgba(71, 161, 71,0.3) ${percentage}%, rgba(71, 161, 71,0) ${percentage}%, rgba(71, 161, 71,0) 100%)`,
    cursor: isReadyToTrade ? 'pointer' : 'auto',
    padding: 0,
    borderBottom: isLast ? 'none' : '1px solid rgba(34, 36, 38, 0.15)',
  };
};

const onMouseOver = e => {
  e.currentTarget.style.backgroundColor = 'rgb(240, 240, 240)';
};

const onMouseOut = e => {
  e.currentTarget.style.backgroundColor = 'initial';
};

const getRowInteraction = (order, onClick, isReadyToTrade) => ({
  key: order.id,
  onMouseOver,
  onMouseOut,
  onFocus: onMouseOver,
  onBlur: onMouseOut,
  onClick: () => (isReadyToTrade ? onClick(order.id) : null),
});

const tableBuyHeadCellStyle = {
  fontWeight: 'bold',
  marginTop: 5,
  marginBottom: 5,
};

const tableSellHeadCellStyle = {
  ...tableBuyHeadCellStyle,
  textAlign: 'right',
};

const tableBuyCellStyle = {
  marginTop: 10,
  marginBottom: 10,
};

const tableSellCellStyle = {
  ...tableBuyCellStyle,
  textAlign: 'right',
};

const Orderbook = ({
  data,
  buyOrders,
  sellOrders,
  totalSellVolume,
  totalBuyVolume,
  baseTokenSymbol,
  quoteTokenSymbol,
  onClick,
  isReadyToTrade,
  loading,
}) => (
  <div id="orderbook">
    <h3 className="App-intro">
      Orderbook for {baseTokenSymbol}/{quoteTokenSymbol}
    </h3>
    {loading ? (
      <div>
        <Image src="./melon-spinner.gif" size="small" centered />
      </div>
    ) : (
      <div>{data.price}</div>
    )}
  </div>
);

// <React.Fragment>
//   <Grid
//     padded={false}
//     container
//     columns={2}
//     style={{ marginTop: 30, marginBottom: 30 }}
//   >
//     <Grid.Column id="SellOrders">
//       <Grid padded={false}>
//         <Grid.Row
//           columns={3}
//           style={{
//             padding: 0,
//             borderBottom: '1px solid rgba(34, 36, 38, 0.15)',
//           }}
//         >
//           <Grid.Column style={tableSellHeadCellStyle}>
//             Cum. Vol.
//           </Grid.Column>
//           <Grid.Column style={tableSellHeadCellStyle}>Vol.</Grid.Column>
//           <Grid.Column style={tableSellHeadCellStyle}>Bid</Grid.Column>
//         </Grid.Row>
//         {buyOrders.map((order, index, { length }) => (
//           <Grid.Row
//             style={getBuyRowStyle(
//               order.cumulativeVolume,
//               totalSellVolume,
//               isReadyToTrade,
//               index + 1 === length,
//             )}
//             {...getRowInteraction(order, onClick, isReadyToTrade)}
//             columns={3}
//           >
//             <Grid.Column style={tableSellCellStyle}>
//               {order.cumulativeVolume}
//             </Grid.Column>
//             <Grid.Column style={tableSellCellStyle}>
//               {order.howMuch}
//             </Grid.Column>
//             <Grid.Column style={tableSellCellStyle}>
//               {order.price}
//             </Grid.Column>
//           </Grid.Row>
//         ))}
//       </Grid>
//     </Grid.Column>
//     <Grid.Column id="BuyOrders" style={{ marginLeft: -1 }}>
//       <Grid padded={false}>
//         <Grid.Row
//           columns={3}
//           style={{
//             padding: 0,
//             borderBottom: '1px solid rgba(34, 36, 38, 0.15)',
//           }}
//         >
//           <Grid.Column style={tableBuyHeadCellStyle}>Ask</Grid.Column>
//           <Grid.Column style={tableBuyHeadCellStyle}>Vol.</Grid.Column>
//           <Grid.Column style={tableBuyHeadCellStyle}>
//             Cum. Vol.
//           </Grid.Column>
//         </Grid.Row>

//         {sellOrders.map((order, index, { length }) => (
//           <Grid.Row
//             style={getSellRowStyle(
//               order.cumulativeVolume,
//               totalBuyVolume,
//               isReadyToTrade,
//               index + 1 === length,
//             )}
//             {...getRowInteraction(order, onClick, isReadyToTrade)}
//             columns={3}
//           >
//             <Grid.Column style={tableBuyCellStyle}>
//               {order.price}
//             </Grid.Column>
//             <Grid.Column style={tableBuyCellStyle}>
//               {order.howMuch}
//             </Grid.Column>
//             <Grid.Column style={tableBuyCellStyle}>
//               {order.cumulativeVolume}
//             </Grid.Column>
//           </Grid.Row>
//         ))}
//       </Grid>
//     </Grid.Column>
//   </Grid>
//   {sellOrders.length === 0 && buyOrders.length === 0 ? (
//     <h4 style={{ marginBottom: 50, color: '#f29954' }}>
//       No orders on the orderbook for this trading pair
//     </h4>
//   ) : null}
// </React.Fragment>

export default Orderbook;
