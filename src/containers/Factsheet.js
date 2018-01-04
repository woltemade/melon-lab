import moment from "moment";
import { connect } from "react-redux";

import Factsheet from "../components/organisms/Factsheet";
import displayNumber from "../utils/displayNumber";

import { actions as appActions } from "../actions/app";

const buildTwitterUrl = (isOwner, fundAddress, fundName, sharePrice) => {
  const text = isOwner
    ? `My #MelonFund "${fundName}" has a share price currently of ${displayNumber(
        sharePrice,
      )}. Have a look:`
    : `The #MelonFund "${fundName}" has a share price currently of ${displayNumber(
        sharePrice,
      )}. Have a look:`;

  const url = `https://ipfs.io/ipns/melon.fund/#${fundAddress}`;
  const hashtags = "TechnologyRegulatedFunds,Melon";
  const via = "melonport";
  const related = "melonport";

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
    hashtags,
  )}&via=${encodeURIComponent(via)}&related=${encodeURIComponent(related)}`;
};

const mapStateToProps = state => ({
  aum: displayNumber(state.fund.gav),
  creationDate: moment(state.fund.inception).format("D. MMM YYYY HH:mm"),
  loading: state.app.transactionInProgress,
  managementReward: displayNumber(state.fund.managementReward),
  name: state.fund.name,
  performanceReward: displayNumber(state.fund.performanceReward),
  personalStake: displayNumber(state.fund.personalStake),
  sharePrice: displayNumber(state.fund.sharePrice),
  totalSupply: displayNumber(state.fund.totalSupply),
  rank: state.fund.rank,
  numberOfFunds: state.fund.numberOfFunds,
  tweetHref: buildTwitterUrl(
    state.fund.owner === state.ethereum.account,
    state.fund.address,
    state.fund.name,
    state.fund.sharePrice,
  ),
});

const mapDispatchToProps = dispatch => ({
  scrollTo: target => dispatch(appActions.scrollTo(target)),
});

const FactsheetContainter = connect(mapStateToProps, mapDispatchToProps)(
  Factsheet,
);

export default FactsheetContainter;
